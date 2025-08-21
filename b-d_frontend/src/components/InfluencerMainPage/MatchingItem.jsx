import styles from "@/styles/components/MainPage/MatchingItem.module.scss";
import { profile_img } from "@/assets";
export default function MatchingItem({ business }) {
  return (
    <div className={styles.container}>
      {business.imgUrl ? (
        <img src={business.imgUrl} className={styles.profileImg} />
      ) : (
        <img src={profile_img} className={styles.profileImg} />
      )}
      <div className={styles.name}>{business.nickName}</div>
      <div className={styles.followCount}>
        {business.avgScore} ({business.reviewCount})
      </div>
    </div>
  );
}
