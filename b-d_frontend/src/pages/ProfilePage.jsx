import React from "react";
import styles from "@/styles/pages/ProfilePage.module.scss";

const ProfilePage = () => {
  return (
    <div className={styles.Container}>
      <img src={logo} className={styles.logo} alt="logo" />
      <p className={styles.subtitle}>
        <span className={styles.highlight}>당신</span>을 알려주세요!
      </p>
      <p className={styles.description}>비디는 당신이 궁금해요.</p>
    </div>
  );
};

export default ProfilePage;
