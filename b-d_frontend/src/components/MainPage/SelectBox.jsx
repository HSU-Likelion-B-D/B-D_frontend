import React from "react";
import styles from "@/styles/MainPage/SelectBox.module.scss";

function SelectBox({ title, content }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>{title}</span>로 활동하고 싶어요.
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
}

export default SelectBox;
