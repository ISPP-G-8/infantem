import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity,ScrollView} from "react-native";
import { Elements, CardElement, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useRouter } from "expo-router";
import { getToken } from "../../../utils/jwtStorage";
import { jwtDecode } from "jwt-decode";

const publicKey = process.env.EXPO_PUBLIC_STRIPE_API_KEY?.trim();

export default function StripeCheckoutScreen() {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    setStripePromise(loadStripe(publicKey));
  }, [publicKey]);

  return (
    <Elements stripe={stripePromise}>
      <StripeCheckoutForm />
    </Elements>
  );
}

function StripeCheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [jwt, setJwt] = useState<string | "">("");
  const [userId, setUserId] = useState<number | null>(null);
  const [priceId, setPriceId] = useState("price_1R4hyZRD1fD8EiuBaXzXdw9p");
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [postalCode, setPostalCode] = useState("");


  useEffect(() => {
        const getUserToken = async () => {
            const token = await getToken();
            setJwt(token? token : "");
        };
        getUserToken();
    }, []);

    useEffect(() => {
        if (!jwt) return; // Evita ejecutar el efecto si jwt es null o undefined
        try {
            const decodedToken: any = jwtDecode(jwt);
            setUserId(decodedToken.jti);
        } catch (error) {
            console.error("Error al decodificar el token:", error);
        }
    }, [jwt]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements.getElement(CardNumberElement);

    if (!cardElement) {
      setError("No se pudo obtener los datos de la tarjeta");
      setLoading(false);
      return;
    }

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        address: { postal_code: postalCode },
      },
    });

    if (stripeError) {
      setError(stripeError.message ?? "Ocurrió un error desconocido");
    } else {
      // Envía el paymentMethod.id a tu backend
      const endpoint = `${apiUrl}/api/v1/subscriptions/create/new?userId=${userId}&priceId=${priceId}&paymentMethodId=${paymentMethod.id}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", 
                    "Authorization": `Bearer ${jwt}`
        }
      });
      if (response.ok) {
        router.push("/account"); // Redirige a éxito
      } else {
        setError("Pago fallido");
      }
    }
    setLoading(false);
  };


  return (
    <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 30,
            width: "100%",
            maxWidth: 420,
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#0D47A1",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            💳 Completa tu pago
          </Text>
  
          <View style={{ marginBottom: 18 }}>
            <Text style={{ fontWeight: "600", color: "#1565C0", marginBottom: 6 }}>
              Número de tarjeta
            </Text>
            <View style={{
              padding: 10, // sin comillas
              marginTop: 10,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,}}>
              <CardNumberElement options={cardStyleOptions} />
            </View>
          </View>
  
          <View style={{ marginBottom: 18 }}>
            <Text style={{ fontWeight: "600", color: "#1565C0", marginBottom: 6 }}>
              Fecha de expiración
            </Text>
            <View style={{
              padding: 10, // sin comillas
              marginTop: 10,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,}}>
              <CardExpiryElement options={cardStyleOptions} />
            </View>
          </View>
  
          <View style={{ marginBottom: 18 }}>
            <Text style={{ fontWeight: "600", color: "#1565C0", marginBottom: 6 }}>
              CVC
            </Text>
            <View style={{
              padding: 10, // sin comillas
              marginTop: 10,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,}}>
              <CardCvcElement options={cardStyleOptions} />
            </View>
          </View>
  
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontWeight: "600", color: "#1565C0", marginBottom: 6 }}>
              Código postal
            </Text>
            <TextInput
              placeholder="Ej. 28001"
              value={postalCode}
              onChangeText={setPostalCode}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                fontSize: 14,
                color: "#333",
              }}
            />
          </View>
  
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!stripe || loading}
            style={{
              backgroundColor: "#1565C0",
              paddingVertical: 14,
              borderRadius: 10,
              alignItems: "center",
              opacity: !stripe || loading ? 0.6 : 1,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {loading ? "Procesando..." : "💰 Pagar"}
            </Text>
          </TouchableOpacity>
  
          <Text
            style={{
              marginTop: 20,
              textAlign: "center",
              fontSize: 14,
              color: "#888",
            }}
          >
            Pronto podrás pagar con Google Pay y Apple Pay 🍎💳
          </Text>
  
          {error && (
            <Text style={{ color: "#D32F2F", textAlign: "center", marginTop: 15 }}>
              {error}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
  
  

}

const cardStyleOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": { color: "#aab7c4" },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const inputWrapperStyle = {
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "#fafafa",
  marginTop: "4px",
};

const textInputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  backgroundColor: "#fafafa",
  fontSize: "16px",
  marginTop: "4px",
};

const payButtonStyle = {
  padding: "14px",
  backgroundColor: "#556cd6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background 0.3s ease",
};
