import { useEffect } from "react";
import styles from "@/styles/components/MainPage/NotificationModal.module.scss";
import { alarm_icon_color } from "@/assets";
import NotificationItem from "./NotificationItem";

export default function NotificationModal({ setIsNotificationModalOpen }) {
  useEffect(() => {
    // 모달이 열릴 때 body 스크롤 차단
    document.body.style.overflow = "hidden";

    // 모달이 닫힐 때 body 스크롤 복원
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <img src={alarm_icon_color} className={styles.alarmIcon} />
          캠페인 알림
        </div>
        <button
          className={styles.closeButton}
          onClick={() => setIsNotificationModalOpen(false)}
        >
          X
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.itemContainer}>
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
        </div>
      </div>
    </div>
  );
}
