import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentStatusPage from './paymentstatuspagecontent';

const stripePromise = loadStripe(process.env.EXPO_PUBLIC_STRIPE_API_KEY?.trim() ?? "");

const PaymentStatusWrapper: React.FC = () => {
  const { payment_intent_client_secret } = useLocalSearchParams<{ payment_intent_client_secret: string }>();

  if (!payment_intent_client_secret) {
    return <p>No se encontró información del pago.</p>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret: payment_intent_client_secret }}>
      <PaymentStatusPage />
    </Elements>
  );
};

export default PaymentStatusWrapper;