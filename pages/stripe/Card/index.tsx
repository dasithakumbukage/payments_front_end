import React from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
} from "@stripe/react-stripe-js";
import { PaymentMethodResult } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Nu5HNA5JEtiO6bcmcMBZqI82kJBwUqB0vTTeZrkJoXjeu093pUoCZXZ0pMXPCD1eFyyjKP7vPj8w5ldoLI1znl400NtNJgQqo"
);

const Card = () => (
  <Elements stripe={stripePromise}>
    <Wrapper />
  </Elements>
);

const Wrapper = () => {
  const elements = useElements();
  const stripe = useStripe();
  const router = useRouter();

  const handleStripePayment = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    const cardEl = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = (await stripe.createPaymentMethod({
      card: cardEl!,
      type: "card",
      billing_details: {
        name: "sample",
        email: "sample@gmail.com",
      },
    })) as PaymentMethodResult;

    if (error) {
      router.push(`/`);
      return;
    } else {
      if (!paymentMethod.id) {
        router.push(`/`);
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_APP_STRIPE_PAYMENT_SERVICE}/create-payment`,
        {
          userId: "001",
          amount: 30,
          paymentMethodId: paymentMethod?.id,
        }
      );
      if (!response.data) {
        router.push(`/`);
      }
    }
  };

  const stripeInputOptions = {
    style: {
      base: { fontSize: "16px", color: "#010203" },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleStripePayment(e);
        }}
      >
        <div>
          <div>Card Number</div>
          <CardNumberElement id="cardNumber" options={stripeInputOptions} />
        </div>

        <div>
          <div>Expiration date</div>
          <CardExpiryElement id="cardExpiry" options={stripeInputOptions} />
        </div>

        <div>
          <div>Security code</div>
          <CardCvcElement id="cardCvc" options={stripeInputOptions} />
        </div>

        <button>Pay</button>
      </form>
    </div>
  );
};

export default Card;
