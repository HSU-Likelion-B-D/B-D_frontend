import React from "react";
import styles from "../../styles/components/PaymentManagePage/PaymentListItem.module.scss";
import { main_busy } from "@/assets";
import { formatNumber } from "@/hooks/formatNumber";

const PaymentListItem = ({
  item,
  setIsPaymentProgressModalOpen,
  setSelectedItem,
}) => {
  const statusColor =
    item.status === "대기중"
      ? "#0C9CE9"
      : item.status === "결제 받기"
      ? "#FF4242"
      : item.status === "정산 완료"
      ? "#42BC54"
      : "#000";

  const handleItemClick = () => {
    if (item.status === "정산 완료" || item.status === "대기중") return;
    setSelectedItem(item); // 클릭된 아이템을 selectedItem으로 설정
    setIsPaymentProgressModalOpen(true); // 모달 열기
  };

  return (
    <div className={styles.listItem} onClick={handleItemClick}>
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
