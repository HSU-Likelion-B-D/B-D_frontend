import styles from "@/styles/components/MainPage/Profile.module.scss";
import { influencer_profile, star_icon } from "@/assets";
export default function Profile() {
  return (
    <div className={styles.container}>
      <img
        className={styles.profileImg}
        src={influencer_profile}
        alt="profile"
      />
      <div className={styles.profileInfo}>
        <div className={styles.profileName}>멋사 TV</div>
        <div className={styles.profileDescription}>POSSIBILITY TO REALITY</div>
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
