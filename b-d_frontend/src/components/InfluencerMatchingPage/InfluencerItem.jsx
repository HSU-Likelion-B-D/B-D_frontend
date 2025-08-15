import styles from "@/styles/components/InfluencerMatchingPage/InfluencerItem.module.scss";
import { store_img, star_icon } from "@/assets";

export default function InfluencerItem() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <img src={store_img} className={styles.profileImage} />
        <div className={styles.title}>
          <div className={styles.nameContainer}>
            <div className={styles.name}>아기사자</div>
            <img src={star_icon} className={styles.starIcon} />
            <div className={styles.starNumber}>
              3.0 <span className={styles.starCount}>(332)</span>
            </div>
          </div>
          <div className={styles.description}>
            유튜브 블로그 / 20k / 300,000 / 음식,음료
          </div>
        </div>
      </div>
      <button className={styles.proposalButton}>제안서 보내기</button>
    </div>
  );
}
