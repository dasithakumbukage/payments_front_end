import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const Onetime = () => {

      const createOrder = async (): Promise<any> => {
        console.log("paypal createOrder");

        const res = await axios
          .get(
            "https://paypal-testing-backend-production.up.railway.app/paypal/create-order",
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(async (response) => await response.data);

        return res.id;
      };

      const onApprove = async (data: any): Promise<any> => {
        const res = await axios
          .get(
            `https://paypal-testing-backend-production.up.railway.app/paypal/create-payment-for-the-order/${data.orderID}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(async (response) => await response.data);

        return res;
      };

  return (
    <div>
      <div>
        <PayPalScriptProvider
          options={{
            clientId:
              "AcOhiY6rTWYXeD0Dc7PPXhb4HdJ2vF7y9piYUF5T-6CeeAqXSIFT8wbDP96v4MLxA2txLuixldwQihJl",
            vault: true,
          }}
        >
          <PayPalButtons
            style={{ layout: "horizontal" }}
            createOrder={() => createOrder()}
            onApprove={(data) => onApprove(data)}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}

export default Onetime