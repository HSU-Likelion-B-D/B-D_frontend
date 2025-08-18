import React from "react";
import styles from "../styles/pages/BdStartPage.module.scss";
import { logo, complete_icon } from "@/assets";
const BdStartPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.whiteBox}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h1 className={styles.subtitle}>환영합니다!</h1>
        <p className={styles.description}>비디의 바다에서 펼쳐질 활동들을</p>
        <p className={styles.description}>비디가 응원할게요!</p>

        <img
          src={complete_icon}
          className={styles.completeIcon}
          alt="complete icon"
        />

        <button type="submit" className={styles.submitBtn}>
          다음으로
        </button>
      </div>
    </div>
  );
};

export default BdStartPage;
