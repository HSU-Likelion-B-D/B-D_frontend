import styles from "@/styles/components/MainPage/Profile.module.scss";
import { star_icon, pencil_icon, profile } from "@/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Profile({ isMainPage = false, businessInfo }) {
  const [profileImage] = useState(profile);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        {localStorage.getItem("imgUrl") !== "null" ? (
          <img
            src={localStorage.getItem("imgUrl")}
            className={styles.profileImage}
          />
        ) : (
          <img src={profileImage} className={styles.profileImage} />
        )}
        {!isMainPage && (
          <label htmlFor="fileUpload" className={styles.cameraButton}>
            <span role="img" aria-label="camera">
              <img
                src={pencil_icon}
                className={styles.cameraIcon}
                alt="camera"
                onClick={() => navigate("/business-profile")}
              />
            </span>
          </label>
        )}
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          style={{ display: isMainPage ? "none" : "none" }}
          onClick={() => navigate("/business-profile")}
        />
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.profileName}>{businessInfo?.workPlaceName}</div>
        <div className={styles.profileDescription}>
          {businessInfo?.introduce}
        </div>
        <div className={styles.rating}>
          <img className={styles.starIcon} src={star_icon} alt="star" />
          <div className={styles.ratingValue}>
            {businessInfo?.avgScore || "0.0"}
          </div>
          <div className={styles.ratingCount}>
            (<span>{businessInfo?.reviewCount || "0"}</span>)
          </div>
        </div>
      </div>
    </div>
  );
}
