import styles from "@/styles/components/MainPage/NotificationItem.module.scss";
import { main_busy, store_img } from "@/assets";

export default function NotificationItem() {
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.profileContainer}>
          <div className={styles.redCircle} />
          <img src={store_img} className={styles.profileImg} />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            <span>아기사자</span> 님이 캠페인을 신청했어요!
          </div>
          <div className={styles.description}>
            호호식당 30초 숏츠 광고 해주실분 구합니다.
          </div>
        </div>
      </div>
      <div className={styles.time}>3시간전</div>
    </div>
  );
}
