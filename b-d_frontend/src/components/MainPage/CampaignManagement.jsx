import { useState } from "react";
import styles from "@/styles/components/MainPage/CampaignManagement.module.scss";
import { hamburger_icon, star_icon, busy_dilly_together } from "@/assets";
import CampaignItem from "./CampaignItem";
import CampaignModal from "./CampaignModal";

const campaignList = [
  {
    title: "#유튜브_30초_숏폼_구합니다.",
    money: "200만원",
    date: "2025.08.11~2025.09.21",
    status: "확정 및 진행중",
  },
  {
    title: "#유튜브_30초_숏폼_구합니다.",
    money: "200만원",
    date: "2025.08.11~2025.09.21",
    status: "확정 및 진행중",
  },
  {
    title: "#유튜브_30초_숏폼_구합니다.",
    money: "200만원",
    date: "2025.08.11~2025.09.21",
    status: "확정 및 진행중",
  },
  {
    title: "#유튜브_30초_숏폼_구합니다.",
    money: "200만원",
    date: "2025.08.11~2025.09.21",
    status: "확정 및 진행중",
  },
  {
    title: "#유튜브_30초_숏폼_구합니다.",
    money: "200만원",
    date: "2025.08.11~2025.09.21",
    status: "확정 및 진행중",
  },
];
export default function CampaignManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerLeftTitle}>
            <span>캠페인 </span>관리
            <img src={star_icon} alt="star_icon" />
          </div>
          <div className={styles.headerLeftSubtitle}>
            현재 캠페인{" "}
            {campaignList.length === 0 ? (
              <span style={{ color: "#FF4242" }}>휴식중</span>
            ) : (
              <span>진행중</span>
            )}
            이에요!
          </div>
        </div>
        <div className={styles.headerRight}>
          <img
            src={hamburger_icon}
            alt="hamburger"
            onClick={() => setIsCampaignModalOpen(!isCampaignModalOpen)}
          />
          {isCampaignModalOpen && (
            <div className={styles.campaignModal}>
              <CampaignModal />
            </div>
          )}
        </div>
      </div>
      <div className={styles.content}>
        {campaignList.length === 0 ? (
          <img src={busy_dilly_together} className={styles.campaignImage} />
        ) : (
          campaignList?.map((campaign, index) => (
            <CampaignItem
              key={index}
              title={campaign.title}
              money={campaign.money}
              date={campaign.date}
              status={campaign.status}
            />
          ))
        )}
      </div>
      {campaignList.length !== 0 && campaignList.length >= 5 && (
        <div className={styles.footer}>
          <div className={styles.footerLeft}>{"<"}</div>
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
          <div className={styles.footerRight}>{">"}</div>
        </div>
      )}
    </div>
  );
}
