import { useState } from "react";
import styles from "@/styles/components/CampaignManagement.module.scss";
import { hamburger_icon, star_icon } from "@/assets";
import CampaignItem from "./CampaignItem";
export default function CampaignManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerLeftTitle}>
            <span>캠페인 </span>관리
            <img src={star_icon} alt="star_icon" />
          </div>
          <div className={styles.headerLeftSubtitle}>
            현재 캠페인 <span>진행중</span>이에요!
          </div>
        </div>
        <div className={styles.headerRight}>
          <img src={hamburger_icon} alt="hamburger" />
        </div>
      </div>
      <div className={styles.content}>
        <CampaignItem />
        <CampaignItem />
      </div>
      <div className={styles.footer}>
        <div className={styles.pageNation}>
          {[1, 2, 3, 4, 5].map((page) => (
            <div
              key={page}
              className={`${styles.pageNationItem} ${
                currentPage === page ? styles.active : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
