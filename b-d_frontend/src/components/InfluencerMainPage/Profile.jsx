import styles from "@/styles/components/InfluencerMainPage/Profile.module.scss";
import { influencer_profile, star_icon_red, pencil_icon } from "@/assets";
import { useState } from "react";
export default function Profile({ isMainPage = false }) {
  const [profileImage, setProfileImage] = useState(influencer_profile);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <img src={profileImage} alt="Profile" className={styles.profileImage} />
        {!isMainPage && (
          <label htmlFor="fileUpload" className={styles.cameraButton}>
            <span role="img" aria-label="camera">
              <img
                src={pencil_icon}
                className={styles.cameraIcon}
                alt="camera"
              />
            </span>
          </label>
        )}
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          style={{ display: isMainPage ? "none" : "none" }}
          onChange={handleFileUpload}
        />
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.profileName}>멋사 TV</div>
        <div className={styles.profileDescription}>POSSIBILITY TO REALITY</div>
        <div className={styles.rating}>
          <img className={styles.starIcon} src={star_icon_red} alt="star" />
          <div className={styles.ratingValue}>4.5</div>
          <div className={styles.ratingCount}>
            (<span>1793</span>)
          </div>
        </div>
      </div>
    </div>
  );
}
