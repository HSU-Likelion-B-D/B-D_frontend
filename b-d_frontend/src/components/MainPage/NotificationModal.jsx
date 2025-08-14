import styles from "@/styles/components/MainPage/NotificationModal.module.scss";
import { alarm_icon_color } from "@/assets";
import NotificationItem from "./NotificationItem";

export default function NotificationModal() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <img src={alarm_icon_color} className={styles.alarmIcon} />
          캠페인 알림
        </div>
        <button className={styles.closeButton}>X</button>
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
