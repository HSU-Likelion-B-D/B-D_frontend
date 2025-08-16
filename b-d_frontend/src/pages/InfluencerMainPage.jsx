import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/InfluencerMainPage.module.scss";
import Profile from "@/components/InfluencerMainPage/Profile";
import Header from "@/components/InfluencerMainPage/Header";
import MatchingList from "@/components/InfluencerMainPage/MatchingList";
import CampaignManagement from "@/components/InfluencerMainPage/CampaignManagement";
import NotificationModal from "@/components/InfluencerMainPage/NotificationModal";
import RateModal from "@/components/InfluencerMainPage/RateModal";
import { useNavigate } from "react-router-dom";

export default function InfluencerMainPage() {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isNotificationModalOpen || isRateModalOpen) {
      window.scrollTo({ top: 0 });
    }
  }, [isNotificationModalOpen, isRateModalOpen]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header setIsNotificationModalOpen={setIsNotificationModalOpen} />
        <div className={styles.topContainer}>
          <div className={styles.profileContainer}>
            <Profile />
            <div className={styles.buttonContainer}>
              <button
                className={styles.Button}
                onClick={() => navigate("/create-proposal")}
              >
                <div className={styles.ButtonTitle}>
                  <span>제안서</span> 만들기
                </div>
                <div className={styles.ButtonSubtitle}>
                  이러한 부분은 맞춰주면 좋겠어요.
                </div>
              </button>
              <button className={styles.Button}>
                <div className={styles.ButtonTitle}>결제 및 정산 관리</div>
                <div className={styles.ButtonSubtitle}>
                  비디가 안전한 거래를 도와줄게요!
                </div>
              </button>
            </div>
          </div>
          <MatchingList />
        </div>
        <div className={styles.banner}></div>
        <div className={styles.bottomContainer}>
          <CampaignManagement />
        </div>
      </div>
      {isNotificationModalOpen && (
        <div className={styles.modalContainer}>
          <NotificationModal
            setIsNotificationModalOpen={setIsNotificationModalOpen}
          />
        </div>
      )}
      {isRateModalOpen && (
        <div className={styles.modalContainer}>
          <RateModal setIsRateModalOpen={setIsRateModalOpen} />
        </div>
      )}
    </div>
  );
}
