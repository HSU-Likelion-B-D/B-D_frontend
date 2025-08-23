import React from "react";
import styles from "../../styles/components/PaymentManagePage/PaymentModal.module.scss";

const PaymentModal = ({ filter, setFilter }) => {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div
          className={`${styles.titleItem} ${
            filter === "all" ? styles.active : ""
          }`}
          onClick={() => setFilter("all")}
        >
          모두보기
        </div>
        <div
          className={`${styles.menuItem} ${
            filter === "PAYMENT_PENDING" ? styles.active : ""
          }`}
          onClick={() => setFilter("PAYMENT_PENDING")}
        >
          결제하기
        </div>
        <div
          className={`${styles.menuItem} ${
            filter === "PAYMENT_COMPLETED" ? styles.active : ""
          }`}
          onClick={() => setFilter("PAYMENT_COMPLETED")}
        >
          결제 완료
        </div>
        <div
          className={`${styles.lastItem} ${
            filter === "COMPLETED" ? styles.active : ""
          }`}
          onClick={() => setFilter("COMPLETED")}
        >
          정산 완료
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
