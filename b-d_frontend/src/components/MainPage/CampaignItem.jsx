import styles from "@/styles/components/MainPage/CampaignItem.module.scss";
import { profile_img } from "@/assets";
export default function CampaignItem({ title, money, date, status }) {
  return (
    <div className={styles.container}>
      <img src={profile_img} className={styles.profileImg} />
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.subTitle}>
            <span className={styles.money}>{money}</span> /{" "}
            <span className={styles.date}>{date}</span>
          </div>
        </div>
        <div className={styles.status}>
          {status}
          <div className={styles.circle} />
        </div>
      </div>
    </div>
  );
}
