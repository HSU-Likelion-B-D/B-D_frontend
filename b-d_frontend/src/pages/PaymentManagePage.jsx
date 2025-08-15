import React from "react";
import styles from "../styles/pages/PaymentManagePage.module.scss";
import Header from "../components/MainPage/Header";
const PaymentManagePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Header isCreateProposalPage={true} />
      </div>
      <div className={styles.titleContainer}>
        <h1 className={styles.subtitle}>
          <span className={styles.highlight}>결제 및 정산</span> 관리하기
        </h1>
        <p className={styles.description}>사장님을 기다리고 있어요!</p>
      </div>
    </div>
  );
};

export default PaymentManagePage;
