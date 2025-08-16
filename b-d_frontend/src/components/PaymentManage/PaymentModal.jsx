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
            filter === "결제 대기" ? styles.active : ""
          }`}
          onClick={() => setFilter("결제 대기")}
        >
          결제 대기
        </div>
        <div
          className={`${styles.menuItem} ${
            filter === "결제 완료" ? styles.active : ""
          }`}
          onClick={() => setFilter("결제 완료")}
        >
          결제 완료
        </div>
        <div
          className={`${styles.lastItem} ${
            filter === "정산 완료" ? styles.active : ""
          }`}
          onClick={() => setFilter("정산 완료")}
        >
          정산 완료
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
