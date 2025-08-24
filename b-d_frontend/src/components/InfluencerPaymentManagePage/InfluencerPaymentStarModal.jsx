import { useEffect, useState } from "react";
import { main_busy, star_icon_red, star_icon_gray } from "@/assets";
import styles from "../../styles/components/InfluencerPaymentManagePage/InfluencerPaymentStarModal.module.scss";
import axiosInstance from "@/apis/axiosInstance";

const InfluencerPaymentStarModal = ({
  setIsPaymentCompleteModalOpen,
  selectedItem,
}) => {
  const [starStates, setStarStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [review, setReview] = useState("");
  useEffect(() => {
    // 모달이 열릴 때 body 스크롤 차단
    document.body.style.overflow = "hidden";

    // 모달이 닫힐 때 body 스크롤 복원
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSendReview = () => {
    axiosInstance
      .post("/bd/api/review/write", {
        reviewedId: selectedItem.reviewedId,
        score: starStates.filter(Boolean).length,
        content: review,
      })
      .then((res) => {
        console.log(res);
        setIsPaymentCompleteModalOpen(false);
      });
  };

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
        <img
          src={selectedItem.imgUrl || main_busy}
          className={styles.influencerImg}
        />
        <div className={styles.name}>
          {selectedItem.reviewInfo.workplaceName}
        </div>
        <div className={styles.description}>
          {selectedItem.reviewInfo.introduction}
        </div>
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
          className={styles.reviewTextarea}
          placeholder="평가를 남겨주세요."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <button
            className={styles.sendButton}
            onClick={handleSendReview}
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
