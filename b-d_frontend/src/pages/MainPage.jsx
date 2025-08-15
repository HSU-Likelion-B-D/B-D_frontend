import React, { useState } from "react";
import styles from "@/styles/pages/MainPage.module.scss";
import Profile from "@/components/MainPage/Profile";
import Header from "@/components/MainPage/Header";
import MatchingList from "@/components/MainPage/MatchingList";
import CampaignManagement from "@/components/MainPage/CampaignManagement";
import NotificationModal from "@/components/MainPage/NotificationModal";
import RateModal from "@/components/MainPage/RateModal";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(true);
  const navigate = useNavigate();
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
