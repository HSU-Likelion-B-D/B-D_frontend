import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/InfluencerMyPage.module.scss";
import Profile from "@/components/InfluencerMainPage/Profile";
import Header from "@/components/InfluencerMainPage/Header";
import SelectButton from "@/components/SelectKWPage/SelectButton";
import NotificationModal from "@/components/InfluencerMainPage/NotificationModal";
import axiosInstance from "@/apis/axiosInstance";

export default function InfluencerMyPage() {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [influencerInfo, setInfluencerInfo] = useState(null);

  // 페이지 마운트 시 스크롤을 상단으로 이동
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isNotificationModalOpen) {
      window.scrollTo({ top: 0 });
    }
  }, [isNotificationModalOpen]);

  useEffect(() => {
    axiosInstance
      .get("/bd/api/influencer/mypage")
      .then((res) => {
        console.log("API 응답:", res);
        console.log("API 응답 데이터 구조:", res.data);
        if (res.data.isSuccess) {
          setInfluencerInfo(res.data.data);
          console.log("influencerInfo 설정됨:", res.data.data);
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
            <Profile isMainPage={false} influencerInfo={influencerInfo} />
          </div>
          <div className={styles.infoContainer}>
            {influencerInfo?.snsUrl || "없음"}
          </div>
          <div className={styles.moneyContainer}>
            요청 금액 <span>{influencerInfo?.minBudget || "0"}</span>
            <br />
            <span>
              {Array.isArray(influencerInfo?.platforms)
                ? influencerInfo.platforms.join(", ")
                : influencerInfo?.platforms || "블로그, 인스타그램"}
            </span>{" "}
            선호
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.bottomContainer}>
          <div className={styles.bottomContent}>
            <div className={styles.bottomTitle}>
              #저를_<span>소개</span>합니다.
            </div>
            <div className={styles.buttonGroup}>
              {influencerInfo?.contentStyles.map((sp) => (
                <SelectButton key={sp}>#{sp}</SelectButton>
              ))}
            </div>
          </div>
          <div className={styles.bottomContent}>
            <div className={styles.bottomTitle}>
              #제가_<span>선호</span>하는_부분은요?
            </div>
            <div className={styles.buttonGroup} id={styles.atmosphere}>
              {influencerInfo?.preferTopics.map((at) => (
                <SelectButton key={at}>#{at}</SelectButton>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.locationContainer}>
          <div className={styles.locationTitle}>
            #주_<span>콘텐츠</span>
          </div>
          <div className={styles.locationButtonGroup}>
            {influencerInfo?.contentTopics &&
            influencerInfo.contentTopics.length > 0 ? (
              influencerInfo.contentTopics.map((at) => (
                <SelectButton key={at}>#{at}</SelectButton>
              ))
            ) : (
              <SelectButton>없음</SelectButton>
            )}
          </div>
        </div>
      </div>
      {isNotificationModalOpen && (
        <div className={styles.modalContainer}>
          <NotificationModal
            setIsNotificationModalOpen={setIsNotificationModalOpen}
          />
        </div>
      )}
    </div>
  );
}
