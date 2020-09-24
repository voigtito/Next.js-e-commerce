import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import stripeConfig from '../config/stripe';
import styled from 'styled-components';

const stripePromise = loadStripe(stripeConfig.publicKey);

interface Props {
  priceId: string;
  itemName: string;
}

const CheckoutButton: React.FC<Props> = ({ priceId, itemName }) => {
  console.log(priceId)
  console.log(itemName)
  const handleClick = async (event) => {
    console.log('aqui')
    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: priceId, // Replace with the ID of your price
        quantity: 1,
      }],
      mode: 'payment',
      successUrl: `http://localhost:3000/success?itemName=${itemName}`,
      cancelUrl: 'http://localhost:3000/cancel',
    });

    if (error) {
      console.log(error)
    }
  };
  return (
    <button role="link" onClick={handleClick}>
      Buy
    </button>
  );
}

export default CheckoutButton;