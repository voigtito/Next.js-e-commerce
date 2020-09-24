import next, { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link'
import React from 'react';
import Stripe from 'stripe';
import CheckoutButton from '../components/CheckoutButton';
import stripeConfig from '../config/stripe';
import styled from 'styled-components';

interface Props {
  product: Stripe.Product,
  price: Stripe.Price
}

export const getStaticPaths: GetStaticPaths = async () => {

  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-08-27',
  });

  const products = await stripe.products.list();

  const paths = products.data.map((product) => {

    return ({
      params: {
        productId: product.id
      },
    })
  });

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

  const productPrice = prices.data.find((price) => (product.id === price.product));

  return {
    props: {
      product,
      price: productPrice,
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
        
        <h2>{Number(price.unit_amount / 100).toFixed(1)}{price.currency.toUpperCase()}</h2>

        <CheckoutButton itemName={product.name} priceId={price.id}/>
        
        <br/>

        <Link href="/">Go back</Link>

      </div>

    </>
  )
}
export default Product;


