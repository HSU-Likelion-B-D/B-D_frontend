import React from "react";
import styles from "../styles/pages/SelectKWPage.module.scss";
import ProgressBar from "../components/ProfilePage/ProgressBar";
import logo from "../assets/logo.svg";
const SelectKWPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.whiteBox}>
        <ProgressBar progress={65} />
        <img src={logo} className={styles.logo} alt="logo" />
        <h1 className={styles.subtitle}>
          #우리 가게를 <span className={styles.highlight}>소개</span>합니다.
        </h1>
        <p className={styles.description}>
          당신의 사업장을 설명할 수 있는 키워드를 모두 골라주세요.
        </p>
        <p className={styles.description}>
          #이런_<span className={styles.highlight}>일</span>을_하고있어요.
        </p>
      </div>
    </div>
  );
};

export default SelectKWPage;
