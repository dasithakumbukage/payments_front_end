import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <Link
        className={styles.topic}
        href={"http://localhost:3000/coin-payment"}
      >
        coin-payment
      </Link>
      <Link className={styles.topic} href={"http://localhost:3000/stripe"}>
        Stripe
      </Link>
      <Link
        className={styles.topic}
        href={"http://localhost:3000/paypal/onetime"}
      >
        Paypal one time payment
      </Link>
      <Link
        className={styles.topic}
        href={"http://localhost:3000/paypal/subscription"}
      >
        Paypal subscription
      </Link>
    </div>
  );
}
