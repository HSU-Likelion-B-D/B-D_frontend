import React from "react";
import styles from "@/styles/MainPage/MainPage.module.scss";
import SelectBox from "@/components/MainPage/SelectBox";

function MainPage() {
  return (
    <div className={styles.container}>
      <SelectBox title="title" content="content" />
    </div>
  );
}

export default MainPage;
