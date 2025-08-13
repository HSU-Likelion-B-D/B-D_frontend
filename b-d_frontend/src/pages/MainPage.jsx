import React from "react";
import styles from "@/styles/pages/MainPage.module.scss";
import Profile from "@/components/MainPage/Profile";
import Header from "@/components/MainPage/Header";

function MainPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.topContainer}>
          <Profile />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
