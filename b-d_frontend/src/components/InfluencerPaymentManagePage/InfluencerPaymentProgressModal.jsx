import React from "react";
import { useEffect } from "react";
import { influencer_pay_progress } from "@/assets";
import styles from "../../styles/components/InfluencerPaymentManagePage/InfluencerPaymentProgressModal.module.scss";
import { formatNumber } from "@/hooks/formatNumber";
import axiosInstance from "@/apis/axiosInstance";
const InfluencerPaymentProgressModal = ({
  setIsPaymentProgressModalOpen,
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

  const handlePayment = () => {
    axiosInstance
      .patch(`/bd/api/payments`, {
        paymentId: selectedItem.paymentId,
      })
      .then((res) => {
        console.log(res);
        setIsPaymentProgressModalOpen(false);
        setIsPaymentCompleteModalOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>결제를 진행할까요?</div>
        <div className={styles.description}>
          선택된 계좌로 정산이 진행됩니다.
        </div>
        <img src={influencer_pay_progress} className={styles.influencerImg} />

        <p className={styles.description2}>
          <span className={styles.highlight}>
            부산은행 / 7777-7777-7777-7777 {localStorage.getItem("nickName")}
          </span>
          으로
        </p>
        <p className={styles.description2}>
          <span className={styles.highlight}>
            정산금액 {formatNumber(selectedItem.totalPaid)}원
          </span>
          이 지급됩니다.
        </p>
        <div className={styles.buttonContainer}>
          <button
            className={styles.cancelButton}
            onClick={() => setIsPaymentProgressModalOpen(false)}
          >
            취소
          </button>
          <button className={styles.sendButton} onClick={handlePayment}>
            보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfluencerPaymentProgressModal;
