import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/MainPage.module.scss";
import Profile from "@/components/MainPage/Profile";
import Header from "@/components/MainPage/Header";
import MatchingList from "@/components/MainPage/MatchingList";
import CampaignManagement from "@/components/MainPage/CampaignManagement";
import NotificationModal from "@/components/MainPage/NotificationModal";
import RateModal from "@/components/MainPage/RateModal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/apis/axiosInstance";
import { banner } from "@/assets";

export default function MainPage() {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const navigate = useNavigate();
  const [businessInfo, setBusinessInfo] = useState(null);
  const [influencerList, setInfluencerList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [review, setReview] = useState(null);
  useEffect(() => {
    axiosInstance
      .get("/bd/api/businessman/mypage")
      .then((res) => {
        if (res.data.isSuccess) {
          setBusinessInfo(res.data.data);
          console.log(res.data.data);
        }
      })
      .catch((err) => {
        console.error("API 에러:", err);
      });
  }, []);
  // 페이지 마운트 시 스크롤을 상단으로 이동
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isNotificationModalOpen || isRateModalOpen) {
      window.scrollTo({ top: 0 });
    }
  }, [isNotificationModalOpen, isRateModalOpen]);

  useEffect(() => {
    axiosInstance
      .get("/bd/api/businessman/home")
      .then((res) => {
        if (res.data.isSuccess) {
          setInfluencerList(res.data.data.Influencers);
        }
      })
      .catch((err) => {
        console.error("API 에러:", err);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/bd/api/payments?status=COMPLETED")
      .then((res) => {
        if (res.data.isSuccess) {
          console.log(res.data.data.content);
          if (res.data.data.content.length > 0) {
            const foundReview = res.data.data.content.find(
              (item) => item.tf === false
            );
            if (foundReview) {
              setReview(foundReview);
              setIsRateModalOpen(true); // 여기 수정
            }
          }
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
            <Profile isMainPage={true} businessInfo={businessInfo} />
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
              <button
                className={styles.Button}
                onClick={() => navigate("/payment-manage")}
              >
                <div className={styles.ButtonTitle}>결제 및 정산 관리</div>
                <div className={styles.ButtonSubtitle}>
                  비디가 안전한 거래를 도와줄게요!
                </div>
              </button>
            </div>
          </div>
          <MatchingList influencerList={influencerList} />
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
      {isRateModalOpen && (
        <div className={styles.modalContainer}>
          <RateModal setIsRateModalOpen={setIsRateModalOpen} review={review} />
        </div>
      )}
    </div>
  );
}
