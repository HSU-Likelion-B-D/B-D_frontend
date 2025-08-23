import React from "react";
import styles from "../../styles/components/PaymentManagePage/PaymentListItem.module.scss";
import { main_busy } from "@/assets";

const PaymentListItem = ({ item, setIsPaymentProgressModalOpen }) => {
  const statusColor =
    item.status === "대기중"
      ? "#0C9CE9"
      : item.status === "결제 받기"
      ? "#FF4242"
      : item.status === "정산 완료"
      ? "#42BC54"
      : "#000";

  // 금액에 3자리마다 쉼표 추가하는 함수
  const formatNumber = (num) => {
    if (!num) return "0";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div
      className={styles.listItem}
      onClick={() => setIsPaymentProgressModalOpen(true)}
    >
      <div className={styles.itemContent}>
        <div className={styles.itemInfo}>
          <img
            src={item.imgUrl || main_busy}
            alt="프로필"
            className={styles.profileImg}
          />
          <div className={styles.itemTitleContainer}>
            <div className={styles.itemTitle}>{item.title}</div>
            <div className={styles.itemDesc}>
              요청금액: {formatNumber(item.offerBudget || 0)} / 수수료 10% / 실
              수령금액{" "}
              <span className={styles.itemPrice}>
                {formatNumber(item.totalPaid || 0)}
              </span>{" "}
              / {item.startDate || ""}~{item.endDate || ""}
            </div>
          </div>
        </div>
        <div className={styles.itemStatus} style={{ color: statusColor }}>
          {item.status}
          <div
            className={styles.statusDot}
            style={{ background: statusColor }}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentListItem;
