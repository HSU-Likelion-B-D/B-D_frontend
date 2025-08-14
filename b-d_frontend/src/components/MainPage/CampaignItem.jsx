import styles from "@/styles/components/MainPage/CampaignItem.module.scss";
import { profile_img } from "@/assets";
export default function CampaignItem() {
  return (
    <div className={styles.container}>
      <img src={profile_img} className={styles.profileImg} />
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <div className={styles.title}>#유튜브_30초_숏폼_구합니다.</div>
          <div className={styles.subTitle}>
            <span className={styles.money}>200만원</span> /{" "}
            <span className={styles.date}>2025.08.11~2025.09.21</span>
          </div>
        </div>
        <div className={styles.status}>
          확정 및 진행중
          <div className={styles.circle} />
        </div>
      </div>
    </div>
  );
}
