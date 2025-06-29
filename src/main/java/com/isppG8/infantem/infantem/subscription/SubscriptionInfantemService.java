package com.isppG8.infantem.infantem.subscription;

import com.stripe.model.Customer;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.Invoice;
import com.stripe.model.PaymentMethod;
import com.stripe.model.Subscription;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerListParams;
import com.stripe.param.PaymentMethodAttachParams;
import com.stripe.param.PaymentMethodListParams;
import com.stripe.param.SubscriptionCreateParams;

import jakarta.persistence.EntityNotFoundException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.isppG8.infantem.infantem.auth.Authorities;
import com.isppG8.infantem.infantem.auth.AuthoritiesService;
import com.isppG8.infantem.infantem.auth.jwt.JwtResponse;
import com.isppG8.infantem.infantem.auth.jwt.JwtUtils;
import com.isppG8.infantem.infantem.config.StripeConfig;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;
import com.isppG8.infantem.infantem.user.dto.UserDTO;
import com.stripe.model.checkout.Session;
import com.stripe.exception.StripeException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SubscriptionInfantemService {

    private final StripeConfig stripeConfig;

    @Autowired
    private JwtUtils jwtUtils;

    public void processPayment() {
        String apiKey = stripeConfig.getStripeApiKey();
        System.out.println("Usando clave de Stripe: " + apiKey);
    }

    private final UserService userService;
    private final SubscriptionInfantemRepository subscriptionInfantemRepository;
    private AuthoritiesService authoritiesService;

    public SubscriptionInfantemService(SubscriptionInfantemRepository subscriptionRepository, StripeConfig stripeConfig,
            UserService userService, AuthoritiesService authoritiesService) {
        this.subscriptionInfantemRepository = subscriptionRepository;
        this.stripeConfig = stripeConfig;
        this.userService = userService;
        this.authoritiesService = authoritiesService;
    }

    @Transactional
    public JwtResponse activateSubscription(User user, String subscriptionId) {
        SubscriptionInfantem subscription = subscriptionInfantemRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Suscripción no encontrada"));

        // Actualiza el rol a premium
        userService.upgradeToPremium(user);

        // Marca la suscripción como activa
        subscription.setStripeSubscriptionId(subscriptionId);
        subscription.setActive(true);
        subscriptionInfantemRepository.save(subscription);

        // Regenera el JWT con el nuevo rol del usuario
        String token = jwtUtils.generateTokenFromUsername(user.getUsername(), user.getAuthorities(), user.getId());
        List<String> roles = Collections.singletonList(user.getAuthorities().getAuthority());

        return new JwtResponse(token, user.getId(), user.getUsername(), roles);
    }

    @Transactional
    public JwtResponse desactivateSubscription(User user, String subscriptionId) {
        Optional<SubscriptionInfantem> subOpt = subscriptionInfantemRepository.findByUser(user);

        if (subOpt.isPresent()) {
            Authorities authorities = authoritiesService.findByAuthority("user");
            user.setAuthorities(authorities);
            UserDTO userDTO = new UserDTO(user);
            userService.updateUser((long) user.getId(), userDTO);

            SubscriptionInfantem subscription = subOpt.get();
            subscription.setStripeSubscriptionId(subscriptionId);
            subscription.setActive(false);
            subscriptionInfantemRepository.save(subscription);

            String token = jwtUtils.generateTokenFromUsername(user.getUsername(), authorities, user.getId());
            List<String> roles = Collections.singletonList(authorities.getAuthority());

            return new JwtResponse(token, user.getId(), user.getUsername(), roles);
        }

        throw new EntityNotFoundException("No subscription found for user.");
    }

    // 1. Crear un cliente en Stripe
    public String createCustomer(String email, String name, String description) throws Exception {
        CustomerCreateParams params = CustomerCreateParams.builder().setEmail(email).setName(name)
                .setDescription(description).build();

        Customer customer = Customer.create(params);
        return customer.getId(); // Devuelve solo el ID del cliente creado en Stripe
    }

    // 3. Asociar método de pago al cliente
    public String attachPaymentMethodToCustomer(String paymentMethodId, String customerId) throws Exception {
        PaymentMethod paymentMethod = PaymentMethod.retrieve(paymentMethodId);
        PaymentMethodAttachParams params = PaymentMethodAttachParams.builder().setCustomer(customerId).build();
        paymentMethod.attach(params);
        return paymentMethod.getId(); // Devuelve solo el ID del método de pago
    }

    public SubscriptionInfantem createSubscriptionNew(Long userId, String priceId, String paymentMethodId,
            String customerId) throws Exception {
        User user = userService.getUserById(userId);

        // ⬇️ Este paso es la clave que falta
        PaymentMethod paymentMethod = PaymentMethod.retrieve(paymentMethodId);
        PaymentMethodAttachParams attachParams = PaymentMethodAttachParams.builder().setCustomer(customerId).build();
        paymentMethod.attach(attachParams);

        // Ahora sí, crear la suscripción con método asociado
        SubscriptionCreateParams params = SubscriptionCreateParams.builder().setCustomer(customerId)
                .addItem(SubscriptionCreateParams.Item.builder().setPrice(priceId).build())
                .setDefaultPaymentMethod(paymentMethodId).build();

        Subscription stripeSubscription = Subscription.create(params);
        userService.upgradeToPremium(user);

        // Guardar en base de datos local
        SubscriptionInfantem newSubscription = new SubscriptionInfantem();
        newSubscription.setUser(user);
        newSubscription.setStartDate(LocalDate.now());
        newSubscription.setActive(true);
        newSubscription.setStripePaymentMethodId(paymentMethodId);
        newSubscription.setStripeSubscriptionId(stripeSubscription.getId());
        newSubscription.setStripeCustomerId(customerId);

        return subscriptionInfantemRepository.save(newSubscription);
    }

    @Transactional
    public SubscriptionInfantem cancelSubscription(String subscriptionId) {
        try {
            // 1. Cancelar en Stripe (programar cancelación al final del periodo actual)
            Subscription stripeSubscription = Subscription.retrieve(subscriptionId);
            stripeSubscription = stripeSubscription.update(Map.of("cancel_at_period_end", true));

            // Obtener la fecha exacta de finalización del periodo actual
            Long periodEndUnix = stripeSubscription.getCurrentPeriodEnd(); // en segundos
            LocalDate endDate = Instant.ofEpochSecond(periodEndUnix).atZone(ZoneId.systemDefault()).toLocalDate();

            // 2. Actualizar en base de datos local
            SubscriptionInfantem localSubscription = subscriptionInfantemRepository
                    .findByStripeSubscriptionId(subscriptionId)
                    .orElseThrow(() -> new ResourceNotFoundException("Suscripción no encontrada"));

            Authorities authorities = authoritiesService.findByAuthority("user");
            User user = userService.getUserById((long) localSubscription.getUser().getId());
            if (user == null) {
                throw new NullPointerException("User cannot be null");
            }
            user.setAuthorities(authorities);
            UserDTO userDTO = new UserDTO(user);
            userService.updateUser((long) user.getId(), userDTO);

            localSubscription.setActive(false); // Marcar como inactiva
            localSubscription.setEndDate(endDate); // Guardar fecha real de finalización

            return subscriptionInfantemRepository.save(localSubscription);

        } catch (StripeException e) {
            throw new RuntimeException("Error al cancelar suscripción en Stripe: " + e.getMessage());
        }
    }

    @Transactional
    public void deleteExpiredSubscriptions() {
        LocalDate today = LocalDate.now();
        List<SubscriptionInfantem> expiredSubscriptions = subscriptionInfantemRepository.findByEndDateBefore(today);

        subscriptionInfantemRepository.deleteAll(expiredSubscriptions);
    }

    // 6. Conseguir usuarios por email
    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getCustomersByEmail(String email) throws Exception {
        CustomerListParams params = CustomerListParams.builder().setEmail(email).build();
        List<Customer> customers = Customer.list(params).getData();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);

        return customers.stream().map(customer -> (Map<String, Object>) objectMapper.convertValue(customer, Map.class))
                .collect(Collectors.toList());

    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> getPaymentMethodsByCustomer(String customerId, Integer last4) {
        try {
            PaymentMethodListParams params = PaymentMethodListParams.builder().setCustomer(customerId)
                    .setType(PaymentMethodListParams.Type.CARD).build();

            List<PaymentMethod> paymentMethods = PaymentMethod.list(params).getData();

            for (PaymentMethod paymentMethod : paymentMethods) {
                if (paymentMethod.getCard() != null && paymentMethod.getCard().getLast4() != null
                        && paymentMethod.getCard().getLast4().equals(last4.toString())) {
                    ObjectMapper objectMapper = new ObjectMapper();
                    return objectMapper.convertValue(paymentMethod, Map.class);
                }
            }
        } catch (Exception e) {
            System.err.println("Error al obtener métodos de pago: " + e.getMessage());
        }

        return null;
    }

    @Transactional
    public void handleCheckoutSessionCompleted(Event event) throws StripeException {
        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        if (!dataObjectDeserializer.getObject().isPresent())
            return;

        Session session = (Session) dataObjectDeserializer.getObject().get();
        String customerId = session.getCustomer();
        String subscriptionId = session.getSubscription();

        if (customerId == null || subscriptionId == null)
            return;

        Optional<User> userOpt = userService.getUserByStripeCustomerId(customerId);
        userOpt.ifPresent(user -> activateSubscription(user, subscriptionId));
    }

    // 🔹 Manejar cuando se paga correctamente una factura de suscripción
    public void handleInvoicePaymentSucceeded(Event event) {
        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        if (!dataObjectDeserializer.getObject().isPresent())
            return;

        Invoice invoice = (Invoice) dataObjectDeserializer.getObject().get();
        String subscriptionId = invoice.getSubscription();
        if (subscriptionId == null)
            return;

        userService.getUserByStripeCustomerId(subscriptionId)
                .ifPresent(user -> activateSubscription(user, subscriptionId));
    }

    // 🔹 Manejar cuando una suscripción es cancelada
    public void handleSubscriptionCanceled(Event event) {
        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        if (!dataObjectDeserializer.getObject().isPresent())
            return;

        Subscription subscription = (Subscription) dataObjectDeserializer.getObject().get();
        String subscriptionId = subscription.getId();
        if (subscriptionId == null)
            return;

        Optional<User> optionalUser = userService.getUserByStripeCustomerId(subscriptionId);
        if (!optionalUser.isPresent())
            return;

        User user = optionalUser.get();
        desactivateSubscription(user, subscriptionId);
    }

    // 🔹 Manejar cuando una suscripción es creada
    @Transactional
    public void handleSubscriptionCreated(Event event) {
        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        if (!dataObjectDeserializer.getObject().isPresent())
            return;

        Subscription subscription = (Subscription) dataObjectDeserializer.getObject().get();
        String subscriptionId = subscription.getId();
        String customerId = subscription.getCustomer();
        if (subscriptionId == null || customerId == null)
            return;

        Optional<User> userOpt = userService.getUserByStripeCustomerId(customerId);
        userOpt.ifPresent(user -> activateSubscription(user, subscriptionId));
    }

    public Optional<SubscriptionInfantem> getSubscriptionUserById(Long userId) {
        Optional<SubscriptionInfantem> subscription = subscriptionInfantemRepository.findSubscriptionByUserId(userId);
        return subscription;
    }
}
