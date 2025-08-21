import styles from "@/styles/components/MainPage/MatchingItem.module.scss";
import { influencer_profile } from "@/assets";
export default function MatchingItem() {
  return (
    <div className={styles.container}>
      <img src={influencer_profile} className={styles.profileImg} />
      <div className={styles.name}>아기사자</div>
      <div className={styles.followCount}>20k</div>
    </div>
  );
}
