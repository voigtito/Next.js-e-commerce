import { GetStaticProps } from 'next';
import Link from 'next/link'
import stripeConfig from '../config/stripe';
import React from 'react';
import Stripe from 'stripe';

interface Props {
  products: Stripe.Product[],
  prices: Stripe.Price[],
}

export const getStaticProps: GetStaticProps = async () => {

  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-08-27',
  });

  const products = await stripe.products.list();
  const prices = await stripe.prices.list();

  return {
    props: {
      products: products.data,
      prices: prices.data,
    }
  }
}

const HomePage: React.FC<Props> = ({ products, prices }) => {
  return (
    <>
      <h1>Simple Stripe Store</h1>

      {products.map((product, index) => (
        <div key={product.id}>
          <h1>{product.name}</h1>
          {product.images && <img
            src={product.images[0]}
            style={{
              width: '100px',
            }}
          />}
          <h2>{Number(prices[index].unit_amount / 100).toFixed(1)}{prices[index].currency.toUpperCase()}</h2>
          <Link href={"/" + prices[index].product}>Visit Page</Link>
          <hr />
        </div>
      ))
      }
    </>
  )
}

export default HomePage;
