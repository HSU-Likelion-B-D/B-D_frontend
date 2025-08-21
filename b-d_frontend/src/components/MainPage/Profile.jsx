import styles from "@/styles/components/MainPage/Profile.module.scss";
import { star_icon, pencil_icon, profile } from "@/assets";
import { useState } from "react";
export default function Profile({ isMainPage = false }) {
  const [profileImage, setProfileImage] = useState(profile);

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
          onChange={(event) => handleFileUpload(event)}
        />
      </div>
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
