import styles from "@/styles/components/MainPage/MatchingItem.module.scss";
import { influencer_profile } from "@/assets";
export default function MatchingItem({ influencer }) {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        {influencer.imgUrl ? (
          <img src={influencer.imgUrl} className={styles.profileImg} />
        ) : (
          <img src={influencer_profile} className={styles.profileImg} />
        )}
        <div className={styles.name}>{influencer.nickName}</div>
      </div>
      <div className={styles.followCount}>{influencer.follower}</div>
    </div>
  );
}
