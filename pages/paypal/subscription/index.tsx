import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const Subscription = () => {
  let subscription_id: any;

  const createSubscriptionPayment = async (): Promise<any> => {
    return await axios
      .post(
        "https://paypal-testing-backend-production.up.railway.app/paypal/create-subscription",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => {
        subscription_id = await response.data;
        return await response.data;
      });
  };

  const checkSubscriptionPayment = async (data: any): Promise<any> => {
    await axios
      .get(
        `https://paypal-testing-backend-production.up.railway.app/paypal/check-subscription/${data.subscriptionID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => await response.data);
  };


  const cancelSubscription = async (): Promise<any> => {
    await axios
      .post(
        `https://paypal-testing-backend-production.up.railway.app/paypal/cancel-subscription/${subscription_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => await response.data);
  };

  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId:
            "AcOhiY6rTWYXeD0Dc7PPXhb4HdJ2vF7y9piYUF5T-6CeeAqXSIFT8wbDP96v4MLxA2txLuixldwQihJl",
          vault: true,
          "disable-funding": "card",
        }}
      >
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createSubscription={() => createSubscriptionPayment()}
          onApprove={(data) => checkSubscriptionPayment(data)}
        />
      </PayPalScriptProvider>

      <div onClick={() => cancelSubscription()}>Cancel Subscription Button</div>
    </div>
  );
};

export default Subscription;
