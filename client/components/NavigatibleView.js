import React, { useEffect, useState } from "react";
import styles from "../styles/NavigatibleView.module.scss";

const NavigatibleView = (props) => {
  const renderCurrentView = () => {
    return props.views[props.current];
  };

  return (
    <>
      <div className={styles.viewContainer}>
        <div onClick={props.handlePrevSelect}>
          <h1 className={styles.previousView}>{`${props.previous ? "<" : ""} ${
            props.previous
          }`}</h1>
        </div>
        <h1 className={styles.currentView}>{props.current}</h1>
        {renderCurrentView()}
      </div>
    </>
  );
};
export default NavigatibleView;
