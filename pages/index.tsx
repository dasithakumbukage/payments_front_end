import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <Link
        className={styles.topic}
        href={"https://paymentsfrontend-production.up.railway.app/stripe"}
      >
        Stripe
      </Link>
      <Link
        className={styles.topic}
        href={
          "https://paymentsfrontend-production.up.railway.app/paypal/onetime"
        }
      >
        Paypal one time payment
      </Link>
      <Link
        className={styles.topic}
        href={
          "https://paymentsfrontend-production.up.railway.app/paypal/subscription"
        }
      >
        Paypal subscription
      </Link>
    </div>
  );
}
