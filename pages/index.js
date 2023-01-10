import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Firehose</title>
      </Head>
      <div className="flex flex-row flex-wrap w-full">Firehose</div>
    </div>
  );
}
