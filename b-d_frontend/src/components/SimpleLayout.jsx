import React from "react";
import styles from "@/styles/components/SimpleLayout.module.scss";
import { Outlet } from "react-router-dom";

export const SimpleLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <span className={styles.e0} />
      </div>
      <Outlet />
    </div>
  );
};
