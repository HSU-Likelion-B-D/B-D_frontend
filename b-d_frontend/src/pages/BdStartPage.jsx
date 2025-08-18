import React from "react";
import styles from "../styles/pages/BdStartPage.module.scss";
import { logo, complete_icon } from "@/assets";
import { useNavigate } from "react-router-dom";
const BdStartPage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/start");
  };

  return (
    <div className={styles.container}>
      <div className={styles.whiteBox}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h1 className={styles.subtitle}>비디는 당신을 알고 싶어요.</h1>
        <p className={styles.description}>당신의 활동을 도와드리기 전</p>
        <p className={styles.description}>
          간단한 질문을 통해 비디가 맞는 인플루언서를 추천해드릴게요!
        </p>

        <img
          src={complete_icon}
          className={styles.completeIcon}
          alt="complete icon"
        />

        <button type="submit" className={styles.submitBtn} onClick={handleNext}>
          다음으로
        </button>
      </div>
    </div>
  );
};

export default BdStartPage;
