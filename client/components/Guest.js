import bankLogo from "../assets/bank-logo.png";
import Image from "next/image";
import React from "react";
import * as styles from "../styles/Guest.module.css";
import Login from "./Login";

const Greeter = () => (
  <div className={styles.greeter}>
    <div className={styles.bankLogo}>
      <Image src={bankLogo} alt="BankLogo" />
    </div>
    <div className={`${styles.horizontalLine} bg-green`}></div>
    <h5 style={{ fontWeight: "600" }}>the future of banking is here</h5>
    <h6 style={{ fontWeight: "100" }}>
      Join now to experience banking like never before. The Blank Bank
      introduces the future of banking systems
    </h6>
    <div style={{ height: "100%" }}></div>
    <h7>don't have an account?</h7>
    <h7>
      <b>Sign Up</b>
    </h7>
  </div>
);

const Guest = (props) => (
  <>
    <div className={styles.content}>
      <div className={styles.background}>
        <Greeter />
      </div>
      <div className={styles.login}>
        <Login />
      </div>
    </div>
  </>
);
export default Guest;
