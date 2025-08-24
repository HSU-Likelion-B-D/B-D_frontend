import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/InfluencerMainPage.module.scss";
import Profile from "@/components/InfluencerMainPage/Profile";
import Header from "@/components/InfluencerMainPage/Header";
import MatchingList from "@/components/InfluencerMainPage/MatchingList";
import CampaignManagement from "@/components/InfluencerMainPage/CampaignManagement";
import NotificationModal from "@/components/InfluencerMainPage/NotificationModal";
import CompleteModal from "@/components/InfluencerMainPage/CompleteModal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/apis/axiosInstance";
import { banner } from "@/assets";

export default function InfluencerMainPage() {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(true);
  const navigate = useNavigate();
  const [influencerInfo, setInfluencerInfo] = useState(null);
  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/bd/api/influencer/mypage")
      .then((res) => {
        if (res.data.isSuccess) {
          setInfluencerInfo(res.data.data);
        }
      })
      .catch((err) => {
        console.error("API 에러:", err);
      });
  }, []);
  useEffect(() => {
    if (isNotificationModalOpen || isCompleteModalOpen) {
      window.scrollTo({ top: 0 });
    }
  }, [isNotificationModalOpen, isCompleteModalOpen]);
  useEffect(() => {
    axiosInstance
      .get("/bd/api/influencer/home")
      .then((res) => {
        if (res.data.isSuccess) {
          setBusinessList(res.data.data.businessMans);
          console.log(res);
        }
      })
      .catch((err) => {
        console.error("API 에러:", err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header setIsNotificationModalOpen={setIsNotificationModalOpen} />
        <div className={styles.topContainer}>
          <div className={styles.profileContainer}>
            <Profile isMainPage={true} influencerInfo={influencerInfo} />
            <div className={styles.buttonContainer}>
              <button
                className={styles.Button}
                onClick={() => navigate("/influencer-create-proposal")}
              >
                <div className={styles.ButtonTitle}>
                  <span>제안서</span> 만들기
                </div>
                <div className={styles.ButtonSubtitle}>
                  이러한 부분은 맞춰주면 좋겠어요.
                </div>
              </button>
              <button
                className={styles.Button}
                onClick={() => navigate("/influencer-payment-manage")}
              >
                <div className={styles.ButtonTitle}>결제 및 정산 관리</div>
                <div className={styles.ButtonSubtitle}>
                  비디가 안전한 거래를 도와줄게요!
                </div>
              </button>
            </div>
          </div>
          <MatchingList businessList={businessList} />
        </div>
        <img src={banner} className={styles.banner} />
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
      {isCompleteModalOpen && (
        <div className={styles.modalContainer}>
          <CompleteModal setIsCompleteModalOpen={setIsCompleteModalOpen} />
        </div>
      )}
    </div>
  );
}
