import styles from "@/styles/components/InfluencerMainPage/Profile.module.scss";
import { influencer_profile, star_icon_red, pencil_icon } from "@/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Profile({ isMainPage = false, influencerInfo }) {
  const [profileImage] = useState(influencer_profile);
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
          <div className={styles.cameraButton}>
            <span role="img" aria-label="camera">
              <img
                src={pencil_icon}
                className={styles.cameraIcon}
                alt="camera"
                onClick={() => navigate("/influencer-profile")}
              />
            </span>
          </div>
        )}
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          style={{ display: isMainPage ? "none" : "none" }}
          onClick={() => navigate("/influencer-introduce")}
        />
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.profileName}>{influencerInfo?.activityName}</div>
        <div className={styles.profileDescription}>
          {influencerInfo?.introduce}
        </div>
        <div className={styles.rating}>
          <img className={styles.starIcon} src={star_icon_red} alt="star" />
          <div className={styles.ratingValue}>
            {influencerInfo?.avgScore || "0.0"}
          </div>
          <div className={styles.ratingCount}>
            (<span>{influencerInfo?.reviewCount || "0"}</span>)
          </div>
        </div>
      </div>
    </div>
  );
}
