import React from "react";
import ProgressBar from "../components/ProfilePage/ProgressBar";
import styles from "../styles/pages/AddressPage.module.scss";
import logo from "../assets/logo.svg";
const AddressPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.whiteBox}>
        <ProgressBar progress={25} />
        <img src={logo} className={styles.logo} alt="logo" />
        <h1 className={styles.subtitle}>
          당신의 <span className={styles.highlight}>가게</span>를 알려주세요!
        </h1>
        <p className={styles.description}>
          거의 다왔어요! 비디가 당신을 분석하고 있어요.
        </p>
      </div>
    </div>
  );
};

export default AddressPage;
