import React from "react";
import styles from "@/styles/components/StartPage/SelectBox.module.scss";

function SelectBox({ title, content1, content2, style }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>{title}</span>로 활동하고 싶어요.
      </div>
      <div className={styles.content} style={style}>
        <div className={styles.content1}>{content1}</div>
        <div className={styles.content2}>{content2}</div>
      </div>
    </div>
  );
}

export default SelectBox;
