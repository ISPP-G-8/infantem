import React, { useState, useEffect } from "react";
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

  // Reemplaza tu return principal por este

  return (
    <div
      style={{minHeight: "100vh", display: "flex", justifyContent: "center", 
        backgroundColor: "#f5f5f5", padding: "40px 20px", overflowY: "auto",
      }}
    >
      <div
        style={{backgroundColor: "white", borderRadius: "12px", padding: "30px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: "400px", width: "100%", display: "flex", flexDirection: "column", gap: "20px", maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Completa tu pago</h2>
        <form
          onSubmit={handleSubmit}
          style={{display: "flex", flexDirection: "column", gap: "16px", width: "100%", }}
        >
          <label>
            Número de tarjeta
            <div style={inputWrapperStyle}>
              <CardNumberElement options={cardStyleOptions} />
            </div>
          </label>

          <label>
            Fecha de expiración
            <div style={inputWrapperStyle}>
              <CardExpiryElement options={cardStyleOptions} />
            </div>
          </label>

          <label>
            CVC
            <div style={inputWrapperStyle}>
              <CardCvcElement options={cardStyleOptions} />
            </div>
          </label>

          <label>
            Código postal
            <input
              type="text"
              placeholder="Código postal"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              style={textInputStyle}
            />
          </label>

          <button
            type="submit"
            disabled={!stripe || loading}
            style={payButtonStyle}
          >
            {loading ? "Procesando..." : "Pagar"}
          </button>

          {/* Placeholder para Apple Pay o Google Pay */}
          <div style={{ marginTop: "20px", textAlign: "center", color: "#888" }}>
            Pronto podrás pagar con Google Pay y Apple Pay
          </div>
        </form>
        {error && (
          <div style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {error}
          </div>
        )}
      </div>
    </div>
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
