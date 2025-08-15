import React from "react";
import styles from "@/styles/components/MainLayout.module.scss";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <span className={styles.e1} />
        <span className={styles.e2} />
        <span className={styles.e3} />
      </div>
      <Outlet />
    </div>
  );
};
