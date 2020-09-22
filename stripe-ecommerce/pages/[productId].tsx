import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link'
import Router from 'next/router'
import React from 'react';
import Stripe from 'stripe';
import stripeConfig from '../config/stripe';

interface Props {
  product: Stripe.Product,
  price: Stripe.Price
}

export const getStaticPaths: GetStaticPaths = async () => {

  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-08-27',
  });

  const products = await stripe.products.list();

  const paths = products.data.map((product) => ({
    params: {
      productId: product.id,
    },
  }));

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-08-27',
  });

  const { productId } = params

  const product = await stripe.products.retrieve(productId as string);

  const prices = await stripe.prices.list();

  const price = prices.data.map((price, index) => {

    if (price.product === productId) {
      return price
    }

  });

  price[0] = null

  return {
    props: {
      product,
      price,
    }
  }
}

const Product: React.FC<Props> = ({ product, price }) => {
  return (
    <>
      <div>
        <h1>{product.name}</h1>
        {product.images && <img
          src={product.images[0]}
          style={{
            width: '100px',
          }}
        />}
        <h2>{Number(price[1].unit_amount / 100).toFixed(1)}{price[1].currency.toUpperCase()}</h2>
        <Link href="/">Go back</Link>
      </div>
    </>
  )
}
export default Product;
