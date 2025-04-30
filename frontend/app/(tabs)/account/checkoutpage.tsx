import React, { useState, useEffect } from 'react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './paymentformprops'; // Ajusta la ruta si es necesario
import { getToken } from "../../../utils/jwtStorage";
import { jwtDecode } from "jwt-decode";
import { ScrollView } from 'react-native';


// Carga Stripe con tu clave publicable FUERA del renderizado del componente
// para evitar recargarlo en cada render. ¡Usa tu clave real!
const publicKey = process.env.EXPO_PUBLIC_STRIPE_API_KEY?.trim();
const stripePromise = loadStripe(publicKey); // Reemplaza con tu clave publicable

const CheckoutPage: React.FC = () => {
  const [clientSecret, setClientSecret] = useState<string>('');
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [jwt, setJwt] = useState<string | "">("");
  const [userId, setUserId] = useState<number | null>(null);

useEffect(() => {
  if (!jwt) return;
  try {
    const decodedToken: any = jwtDecode(jwt);
    setUserId(decodedToken.jti);
  } catch (error) {
    console.error("Error al decodificar el token:", error);
  }
}, [jwt]);



  useEffect(() => {
          const getUserToken = async () => {
              const token = await getToken();
              setJwt(token? token : "");
          };
          getUserToken();
      }, []);

      useEffect(() => {
        const createCustomerAndIntent = async () => {
          if (!jwt || !userId) return;
      
          try {
            // 1️⃣ Crear el customer en Stripe (tu backend lo hace)
            const resCustomer = await fetch(`${apiUrl}/api/v1/subscriptions/customer-id?userId=${userId}`, {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`,
              },
            });
            if (!resCustomer.ok) throw new Error("Error al crear el cliente en Stripe");
            const customerId = await resCustomer.text();
      
            // 2️⃣ Crear el PaymentIntent usando ese customerId
            const resIntent = await fetch(`${apiUrl}/api/v1/subscriptions/create-payment-intent`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`,
              },
              body: JSON.stringify({
                amount: 499,
                currency: "eur",
                customerId: customerId,
              }),
            });
      
            const data = await resIntent.json();
            if (data.clientSecret) {
              setClientSecret(data.clientSecret);
            } else {
              console.error("No se recibió clientSecret");
            }
          } catch (error) {
            console.error("Error creando cliente o PaymentIntent:", error);
          }
        };
      
        createCustomerAndIntent();
      }, [userId, jwt]);
      

  // Opciones para pasar al Provider de Elements
  const options: StripeElementsOptions = {
    clientSecret,
    // Apariencia (opcional, para personalizar)
    appearance: {
      theme: 'stripe', // 'stripe', 'night', 'flat', o 'none'
      variables: {
         colorPrimary: '#0570de', // Color principal
         // ... otras variables de CSS
      },
    },
  };

  return (
    <ScrollView>
    <div className="App">
      <h1>Checkout</h1>
      {clientSecret ? (
        
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm clientSecret={clientSecret} />
        </Elements>
        
      ) : (
        <div>Cargando formulario de pago...</div>
        // O muestra un indicador de carga más sofisticad
      )}
    </div>
    </ScrollView>
  );
}

export default CheckoutPage;