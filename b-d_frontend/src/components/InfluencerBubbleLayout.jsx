import React from "react";
import styles from "@/styles/components/InfluencerBubbleLayout.module.scss";
import { Outlet } from "react-router-dom";

export const InfluencerBubbleLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <span className={styles.e0} />
        <span className={styles.e1} />
        <span className={styles.e2} />
        <span className={styles.e3} />
      </div>
      <Outlet />
    </div>
  );
};
