import React, { useEffect, useState } from "react";
import styles from "../styles/NavBar.module.scss";
import Logo from "../assets/bank-logo.png";
import Image from "next/image";

const NavBar = (props) => {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {}, []);

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbar}`}>
        <div className="container-fluid">
          <div className={styles.bankLogo}>
            <Image src={Logo} alt="bankLogo" />
          </div>
          <div className={styles.verticalSeperator}></div>
          <a className={`navbar-brand ${styles.brand}`} href="#">
            {props.options.find((o) => o.selected).label}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            {props.options
              .filter((o) => !o.selected)
              .map((l) => (
                <a
                  className={`nav-link ${styles.selectableLabel}`}
                  key={l.key}
                  onClick={l.action}
                >
                  {l.label}
                </a>
              ))}
            <div className="navbar-nav"></div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
