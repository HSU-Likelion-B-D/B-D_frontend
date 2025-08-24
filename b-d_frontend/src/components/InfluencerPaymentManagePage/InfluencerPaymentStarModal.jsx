import { useEffect, useState } from "react";
import { store_img, star_icon_red, star_icon_gray } from "@/assets";
import styles from "../../styles/components/InfluencerPaymentManagePage/InfluencerPaymentStarModal.module.scss";
const InfluencerPaymentStarModal = ({ setIsPaymentCompleteModalOpen }) => {
  const [starStates, setStarStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    // 모달이 열릴 때 body 스크롤 차단
    document.body.style.overflow = "hidden";

    // 모달이 닫힐 때 body 스크롤 복원
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleRate = (index) => {
    setStarStates((prevStates) => {
      const newStates = [...prevStates];

      // 클릭한 별까지 모든 별을 활성화
      for (let i = 0; i <= index; i++) {
        newStates[i] = true;
      }

      // 클릭한 별 이후의 모든 별을 비활성화
      for (let i = index + 1; i < newStates.length; i++) {
        newStates[i] = false;
      }

      // 선택된 별점을 콘솔에 출력 (1~5)
      const selectedRating = index + 1;
      console.log(`선택된 별점: ${selectedRating}점`);

      return newStates;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>함께한 사장님은 어떠셨나요?</div>
        <div className={styles.subTitle}>
          평가 결과는 상대 프로필에 반영됩니다.
        </div>
        <img src={store_img} className={styles.influencerImg} />
        <div className={styles.name}>호호식당( 대학로점 )</div>
        <div className={styles.description}>유튜브 30초 숏폼 구합니다.</div>
        <div className={styles.rateContainer}>
          {[...Array(5)].map((_, index) => (
            <img
              src={starStates[index] ? star_icon_red : star_icon_gray}
              className={styles.starImg}
              key={index}
              onClick={() => handleRate(index)}
            />
          ))}
        </div>
        <textarea
          className={styles.description}
          placeholder="평가를 남겨주세요."
        />
        <div className={styles.buttonContainer}>
          <button
            className={styles.sendButton}
            onClick={() => setIsPaymentCompleteModalOpen(false)}
            disabled={!starStates.some((star) => star)}
          >
            평가하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfluencerPaymentStarModal;
