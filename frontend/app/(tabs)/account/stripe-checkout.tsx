import React, { useState, useEffect } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useRouter } from "expo-router";
import { getToken } from "../../../utils/jwtStorage";
import { jwtDecode } from "jwt-decode";

const publicKey = process.env.EXPO_PUBLIC_STRIPE_API_KEY?.trim();


function StripeCheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [jwt, setJwt] = useState<string | "">("");
  const [userId, setUserId] = useState<number | null>(null);
  const [priceId, setPriceId] = useState("price_1R7NfNImCCGaknJ7116zw3Vb");
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  

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
    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
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
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "15px", // Espaciado entre elementos
      }}
    >
      <h1 style={{ textAlign: "center" }}>Completa tu pago</h1>
      <form 
        onSubmit={handleSubmit} 
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "10px", // Espaciado entre los inputs
        }}
      >
        <CardElement
          options={{
            style: {
              base: { fontSize: "16px", color: "#424770", padding: "10px" },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || loading}
          style={{
            padding: "12px",
            background: loading ? "#ccc" : "#556cd6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            width: "100%",
            cursor: "pointer",
          }}
        >
          {loading ? "Procesando..." : "Pagar"}
        </button>
      </form>
      {error && <div style={{ color: "red", marginTop: "12px" }}>{error}</div>}
    </div>
  );
  
}

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
