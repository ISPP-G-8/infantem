import React, { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { getToken } from '../../../utils/jwtStorage';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'expo-router'; // 👈 Añadido
import { useAuth } from "../../../context/AuthContext";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const priceId = "price_1R4hyZRD1fD8EiuBaXzXdw9p";

const PaymentStatusPage: React.FC = () => {
  const stripe = useStripe();
  const router = useRouter(); // 👈 Inicializamos el router
  const [message, setMessage] = useState<string | null>('Verificando estado del pago...');
  const [hasCreatedSubscription, setHasCreatedSubscription] = useState(false);
  const [jwt, setJwt] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);
  const { updateToken, checkAuth } = useAuth(); 

  useEffect(() => {
    const getUserToken = async () => {
      const token = await getToken();
      setJwt(token ?? "");
      if (token) {
        const decodedToken: any = jwtDecode(token);
        setUserId(decodedToken.jti);
      }
    };
    getUserToken();
  }, []);

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    if (!stripe || !clientSecret || !jwt || !userId || hasCreatedSubscription) return;

    stripe.retrievePaymentIntent(clientSecret).then(async ({ paymentIntent, error }) => {
      if (error) {
        setMessage(`Error al verificar el pago: ${error.message}`);
        return;
      }

      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("¡Pago realizado con éxito! Activando suscripción...");
          // Pago exitoso
try {
  const res = await fetch(`${apiUrl}/api/v1/subscriptions/create-subscription-from-payment-intent?userId=${userId}&priceId=${priceId}&paymentIntentId=${paymentIntent.id}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    const newToken = data.token?.token;

    if (newToken) {
      await updateToken(newToken); // guarda el nuevo token y actualiza el contexto
      await checkAuth(); // fuerza la recarga del usuario (rol actualizado)
    }
    setMessage("¡Suscripción activada con éxito!");
    setHasCreatedSubscription(true);
    setTimeout(() => {
      router.push('/account');
    }, 2000);
  } else {
    setMessage("Pago exitoso, pero hubo un error al activar la suscripción.");
  }
} catch (err) {
  console.error(err);
  setMessage("Error al contactar con el servidor.");
}

          break;

        case "processing":
          setMessage("Tu pago se está procesando. Te notificaremos cuando se complete.");
          break;

        case "requires_payment_method":
          setMessage("El pago falló. Por favor, intenta con otro método de pago.");
          break;

        default:
          setMessage(`Estado inesperado: ${paymentIntent?.status ?? 'desconocido'}.`);
          break;
      }
    });
  }, [stripe, jwt, userId, hasCreatedSubscription]);

  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <h2 style={{ color: '#0570de' }}>Estado del pago</h2>
      <p style={{ fontSize: 16 }}>{message}</p>
    </div>
  );
};

export default PaymentStatusPage;
