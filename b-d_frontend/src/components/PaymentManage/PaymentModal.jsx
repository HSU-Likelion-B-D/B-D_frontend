import React from "react";
import styles from "../../styles/components/PaymentManagePage/PaymentModal.module.scss";

const PaymentModal = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.titleItem}>모두보기</div>
        <div className={styles.menuItem}>결제 대기</div>
        <div className={styles.menuItem}>결제 완료</div>
        <div className={styles.lastItem}>정산 완료</div>
      </div>
    </div>
  );
};

export default PaymentModal;
