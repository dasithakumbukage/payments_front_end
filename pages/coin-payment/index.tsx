import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import axios from "axios";
import styles from "./index.module.css";

const CoinPayment = () => {
  const [isAddress, setAddress] = useState({ address: "", amount: 0 });

  const CoinPaymentActive = async (): Promise<any> => {
    await axios
      .post(
        `https://paypal-testing-backend-production.up.railway.app/coin-payment/create`,
        {
          email: "test2@gmail.com",
          currency: "LTCT", //    ETH = "ETH", BTC = "BTC", LTC = "LTC", LTCT = "LTCT" use LTCT for lite coin app
          amount: 0.1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) =>
        setAddress({
          address: response.data.address,
          amount: response.data.amount,
        })
      );
  };

  return (
    <div className={styles.main}>
      <div className={styles.btn} onClick={() => CoinPaymentActive()}>
        Create Coin Payment
      </div>
      <div className={styles.address}>
        coinpayment Address : {isAddress.address}
      </div>
      <div className={styles.address}>
        coinpayment amount : {isAddress.amount}
      </div>
    </div>
  );
};

export default CoinPayment;
