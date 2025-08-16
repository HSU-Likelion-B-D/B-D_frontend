import styles from "../../styles/components/PaymentManagePage/PaymentProgressModal.module.scss";
import { useEffect, useState } from "react";
import { pay_card, pay_transfer, pay_easy } from "@/assets";

export default function PaymentProgressModal({
  setIsPaymentProgressModalOpen,
  setIsPaymentCompleteModalOpen,
}) {
  useEffect(() => {
    // 모달이 열릴 때 body 스크롤 차단
    document.body.style.overflow = "hidden";

    // 모달이 닫힐 때 body 스크롤 복원
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>결제를 진행할까요?</div>
        <div className={styles.subTitle}>멋진 결과물을 기대하고 있을게요!</div>

        <div className={styles.payMethodWrap}>
          <div className={styles.payMethod}>
            <img src={pay_card} alt="카드결제" className={styles.payIcon} />

            <img src={pay_transfer} alt="계좌이체" className={styles.payIcon} />

            <img src={pay_easy} alt="간편결제" className={styles.payIcon} />
          </div>
        </div>

        <div className={styles.agreeWrap}>
          <label className={styles.agreeItem}>
            <input
              type="radio"
              checked={agree1}
              onChange={(e) => setAgree1(e.target.checked)}
            />
            수수료 정책 및 제안서 약관에 동의합니다
          </label>
          <label className={styles.agreeItem}>
            <input
              type="radio"
              checked={agree2}
              onChange={(e) => setAgree2(e.target.checked)}
            />
            결제 후에는 캠페인 취소 시 위약금이 발생할 수 있음에 동의합니다
          </label>
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.cancelButton}
            onClick={() => setIsPaymentProgressModalOpen(false)}
          >
            취소
          </button>
          <button
            className={styles.sendButton}
            onClick={() => {
              setIsPaymentProgressModalOpen(false);
              setIsPaymentCompleteModalOpen(true);
            }}
          >
            보내기
          </button>
        </div>
      </div>
    </div>
  );
}
