import React from "react";
import { useEffect } from "react";
import { dilly_left } from "@/assets";
import styles from "../../styles/components/PaymentManagePage/PaymentCompleteModal.module.scss";
const PaymentCompleteModal = ({
  setIsPaymentCompleteModalOpen,
  selectedItem,
}) => {
  useEffect(() => {
    // 모달이 열릴 때 body 스크롤 차단
    document.body.style.overflow = "hidden";

    // 모달이 닫힐 때 body 스크롤 복원
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          결제가 <span className={styles.highlight}>완료</span>되었습니다!
        </div>
        <img
          src={selectedItem.imgUrl || dilly_left}
          className={styles.influencerImg}
        />
        <div className={styles.name}>
          {selectedItem.reviewInfo.nickname} (
          {selectedItem.reviewInfo.activityName})
        </div>
        <div className={styles.description}>
          <span className={styles.highlight}>
            {selectedItem.reviewInfo.nickname}
          </span>{" "}
          님에게 캠페인 요청이 전송되었습니다.
        </div>
        <p className={styles.description2}>
          캠페인 진행상황은 메인페이지에서 확인하실 수 있습니다.
        </p>
        <div className={styles.buttonContainer}>
          <button
            className={styles.sendButton}
            onClick={() => setIsPaymentCompleteModalOpen(false)}
          >
            확인했어요!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCompleteModal;
