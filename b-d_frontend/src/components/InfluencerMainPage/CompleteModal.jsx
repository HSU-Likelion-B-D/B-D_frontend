import styles from "@/styles/components/InfluencerMainPage/CompleteModal.module.scss";
import { useEffect, useState } from "react";

export default function CompleteModal({ setIsCompleteModalOpen }) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // 모달이 열릴 때 body 스크롤 차단
    document.body.style.overflow = "hidden";

    // 모달이 닫힐 때 body 스크롤 복원
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      // TODO: 실제 API 호출 로직
      console.log("인증 URL 전송:", inputValue);
      setIsCompleteModalOpen(false);
    }
  };

  const isInputValid = inputValue.trim().length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <span className={styles.highlight}>"유튜브 30초 숏폼..."</span>{" "}
          캠페인을 완료하시겠습니까?
        </div>
        <div className={styles.subTitle}>인증을 위한 URL을 입력해주세요.</div>
        <input
          type="text"
          className={styles.input}
          placeholder="상세주소"
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className={styles.description}>
          광고 인증이 완료되면 수익 관리에서 정산해주세요!
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.cancelButton}
            onClick={() => setIsCompleteModalOpen(false)}
          >
            취소
          </button>
          <button
            className={`${styles.sendButton} ${
              !isInputValid ? styles.disabled : ""
            }`}
            onClick={handleSend}
            disabled={!isInputValid}
          >
            보내기
          </button>
        </div>
      </div>
    </div>
  );
}
