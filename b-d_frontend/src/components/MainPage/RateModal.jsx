import styles from "@/styles/components/MainPage/RateModal.module.scss";
import { useEffect, useState } from "react";
import { main_dilly, star_icon, star_icon_gray } from "@/assets";
import axiosInstance from "@/apis/axiosInstance";

export default function RateModal({ setIsRateModalOpen, review }) {
  const [starStates, setStarStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]); // 초기 상태: 3개 별이 활성화
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
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
      setRating(selectedRating);

      return newStates;
    });
  };

  const handleSendReview = (content, rating) => {
    axiosInstance
      .post("/bd/api/review/write", {
        paymentId: review.paymentId,
        reviewedId: review.reviewedId,
        content: content,
        score: rating,
      })
      .then((res) => {
        if (res.data.isSuccess) {
          setIsRateModalOpen(false);
        }
      })
      .catch((err) => {
        console.error("API 에러:", err);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>함께한 인플루언서는 어떠셨나요?</div>
        <div className={styles.subTitle}>
          평가 결과는 상대 프로필에 반영됩니다.
        </div>
        <img
          src={review.imgUrl || main_dilly}
          className={styles.influencerImg}
        />
        <div className={styles.name}>
          {review.reviewInfo.nickname} ({review.reviewInfo.activityName})
        </div>
        <div className={styles.description}></div>
        <div className={styles.rateContainer}>
          {[...Array(5)].map((_, index) => (
            <img
              src={starStates[index] ? star_icon : star_icon_gray}
              className={styles.starImg}
              key={index}
              onClick={() => handleRate(index)}
            />
          ))}
        </div>
        <textarea
          className={styles.reviewTextarea}
          placeholder="평가를 남겨주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <button
            className={styles.sendButton}
            onClick={() => handleSendReview(content, rating)}
            disabled={!starStates.some((star) => star) || content.length === 0}
          >
            평가하기
          </button>
        </div>
      </div>
    </div>
  );
}
