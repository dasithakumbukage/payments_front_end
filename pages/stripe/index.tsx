import React, { useEffect, useState } from "react";
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
import styles from "./index.module.css";

const stripePromise = loadStripe(
  "pk_test_51Nu5HNA5JEtiO6bcmcMBZqI82kJBwUqB0vTTeZrkJoXjeu093pUoCZXZ0pMXPCD1eFyyjKP7vPj8w5ldoLI1znl400NtNJgQqo"
);

const Stripe = () => (
  <Elements stripe={stripePromise}>
    <Wrapper />
  </Elements>
);

const Wrapper = () => {
  const elements = useElements();
  const stripe = useStripe();
  const router = useRouter();
  const [isSubscriptionActive, setSubscriptionActive] = useState([]);

  useEffect(() => {
    listActiveSubscription();
  }, []);

  useEffect(() => {
    console.log("isSubscriptionActive", isSubscriptionActive);
  }, [isSubscriptionActive]);

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
        `https://paypal-testing-backend-production.up.railway.app/stripe/create-payment`,
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

  const CancelSubscription = async (id: any): Promise<any> => {
    console.log("stripe CancelSubscription", id);

    const res = await axios
      .post(
        `https://paypal-testing-backend-production.up.railway.app/stripe/cancel-membership-subscription/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => await response.data);

    return res;
  };

  const listActiveSubscription = async (): Promise<any> => {
    await axios
      .get(
        `https://paypal-testing-backend-production.up.railway.app/stripe/get-all-active-subscriptions`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) =>
        setSubscriptionActive(await response.data.data)
      );
  };

  return (
    <div className={styles.main}>
      <div className={styles.subscription}>
        <div className={styles.createPayment}>
          <div className={styles.heading}>Create Subscription</div>
          <form
            className={styles.form}
            onSubmit={(e) => {
              handleStripePayment(e);
            }}
          >
            <div className={styles.inputFeilds}>
              <div className={styles.fieldsNames}>Card Number</div>
              <CardNumberElement id="cardNumber" options={stripeInputOptions} />
            </div>

            <div className={styles.inputFeilds}>
              <div className={styles.fieldsNames}>Expiration date</div>
              <CardExpiryElement id="cardExpiry" options={stripeInputOptions} />
            </div>

            <div className={styles.inputFeilds}>
              <div className={styles.fieldsNames}>Security code</div>
              <CardCvcElement id="cardCvc" options={stripeInputOptions} />
            </div>

            <button className={styles.payButton}>Pay</button>
          </form>
        </div>
        <div className={styles.createPayment}>
          <div className={styles.heading}> Cancel subscription </div>
          <div className={styles.mapSubscription}>
            {isSubscriptionActive &&
              isSubscriptionActive.map((value: any, index: any) => (
                <div
                  className={styles.subId}
                  key={index}
                  onClick={() => CancelSubscription(value.id)}
                >
                  {value.id}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className={styles.oneTimePayment}>f</div>
    </div>
  );
};

export default Stripe;
