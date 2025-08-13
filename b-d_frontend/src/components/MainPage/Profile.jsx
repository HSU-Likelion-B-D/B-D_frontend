import styles from "@/styles/components/Profile.module.scss";
import { profile_img, star_icon } from "@/assets";
export default function Profile() {
  return (
    <div className={styles.container}>
      <img className={styles.profileImg} src={profile_img} alt="profile" />
      <div className={styles.profileInfo}>
        <div className={styles.profileName}>호호식당 대학로점</div>
        <div className={styles.profileDescription}>
          따뜻한 분위기에서 즐기는 일본 가정식
        </div>
        <div className={styles.rating}>
          <img className={styles.starIcon} src={star_icon} alt="star" />
          <div className={styles.ratingValue}>4.5</div>
          <div className={styles.ratingCount}>
            (<span>1793</span>)
          </div>
        </div>
      </div>
    </div>
  );
}
