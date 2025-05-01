import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { ScrollView } from 'react-native';
import { getToken } from "../../../utils/jwtStorage";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "expo-router";

interface PaymentFormProps {
  clientSecret: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const gs = require("../../../static/styles/globalStyles");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
  
    setIsLoading(true);
    setMessage(null);
  
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: '' },
      redirect: 'if_required',
    });
  
    if (error) {
      setMessage(error.message || 'Ocurrió un error inesperado.');
      setIsLoading(false);
      return;
    }
  
    switch (paymentIntent?.status) {
      case "succeeded":
        router.push({
          pathname: "/account/paymentstatuspage",
          params: {
            payment_intent_client_secret: paymentIntent.client_secret,
          },
        });
        break;
      case "processing":
        setMessage("Tu pago se está procesando...");
        break;
      case "requires_payment_method":
        setMessage("El pago fue rechazado. Intenta con otro método.");
        break;
      default:
        setMessage(`Estado inesperado del pago: ${paymentIntent?.status}`);
        break;
    }
  
    setIsLoading(false);
  };
  

  return (
    <ScrollView >
      <div style={{ maxWidth: '2000px', margin : '0 auto' }}>
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" options={{ layout: 'accordion' }} />
          <button disabled={isLoading || !stripe || !elements} id="submit" style={{ backgroundColor: "#0070BA", 
            width: "300px", padding: 15, borderRadius: 10, alignItems: "center" }}>
            <span>{isLoading ? 'Procesando...' : 'Pagar Ahora'}</span>
          </button>
          {message && <div id="payment-message">{message}</div>}
        </form>
      </div>
    </ScrollView>
  );
};


export default PaymentForm;