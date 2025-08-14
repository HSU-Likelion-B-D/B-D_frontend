import React from "react";
import styles from "../../styles/components/GalleryPopup.module.scss";

const GalleryPopup = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          닫기
        </button>
        <div className={styles.galleryContent}>
          <p>갤러리 팝업창 내용</p>
          {/* Add gallery items here */}
        </div>
      </div>
    </div>
  );
};

export default GalleryPopup;
