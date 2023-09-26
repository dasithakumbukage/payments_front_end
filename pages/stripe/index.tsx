import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import Card from "./Card";
import { loadStripe } from "@stripe/stripe-js";

const Stripe = () => {
  const stripePromise = loadStripe(
    "pk_test_51Nu5HNA5JEtiO6bcmcMBZqI82kJBwUqB0vTTeZrkJoXjeu093pUoCZXZ0pMXPCD1eFyyjKP7vPj8w5ldoLI1znl400NtNJgQqo"
  );

  return (
    <div>
      <Elements stripe={stripePromise}>
        <Card />
      </Elements>
    </div>
  );
};

export default Stripe;
