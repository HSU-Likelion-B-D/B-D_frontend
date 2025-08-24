import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/BusinessMyPage.module.scss";
import Profile from "@/components/MainPage/Profile";
import Header from "@/components/MainPage/Header";
import SelectButton from "@/components/SelectKWPage/SelectButton";
import NotificationModal from "@/components/MainPage/NotificationModal";
import axiosInstance from "@/apis/axiosInstance";
import KakaoMap from "@/components/BusinessMyPage/KakaoMap";
export default function BusinessMyPage() {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [businessInfo, setBusinessInfo] = useState(null);
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
      .get("/bd/api/businessman/mypage")
      .then((res) => {
        console.log("API 응답:", res);
        console.log("API 응답 데이터 구조:", res.data);
        if (res.data.isSuccess) {
          setBusinessInfo(res.data.data);
          console.log("businessInfo 설정됨:", res.data.data);
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
            <Profile isMainPage={false} businessInfo={businessInfo} />
          </div>
          <div className={styles.infoContainer}>
            휴무일 없음
            <br />
            {businessInfo?.openTime} ~ {businessInfo?.closeTime} / 브레이크타임{" "}
            {businessInfo?.breakTime || "없음"} / 라스트오더{" "}
            {businessInfo?.lastOrderTime || "없음"}
            <br />
            점심 라스트오더 {businessInfo?.lunchLastOrderTime || "없음"} / 저녁
            라스트오더 {businessInfo?.dinnerLastOrderTime || "없음"}
          </div>
          <div className={styles.moneyContainer}>
            <span>
              {businessInfo?.minBudget || "0"}~{businessInfo?.maxBudget || "0"}
            </span>{" "}
            지급 예정 <br />
            <span>
              {Array.isArray(businessInfo?.promotionList)
                ? businessInfo.promotionList.join(", ")
                : businessInfo?.promotionList || "블로그, 인스타그램"}
            </span>{" "}
            선호
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.bottomContainer}>
          <div className={styles.bottomContent}>
            <div className={styles.bottomTitle}>
              #이런_<span>일</span>을_하고있어요.
            </div>
            <div className={styles.buttonGroup}>
              {businessInfo?.categoryList.map((sp) => (
                <SelectButton key={sp}>#{sp}</SelectButton>
              ))}
            </div>
          </div>
          <div className={styles.bottomContent}>
            <div className={styles.bottomTitle}>
              #이런_<span>분위기</span>의_가게를_운영해요
            </div>
            <div className={styles.buttonGroup} id={styles.atmosphere}>
              {businessInfo?.moodList?.map((at) => (
                <SelectButton key={at}>#{at}</SelectButton>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.mapContainer}>
          <div className={styles.map}>
            <KakaoMap address={businessInfo?.address || ""} />
          </div>
          <div className={styles.mapInfo}>
            <div className={styles.mapInfoTitle}>
              {businessInfo?.address || ""} {businessInfo?.detailAddress || ""}
            </div>
            <div className={styles.mapInfoContent}>
              온라인 매장 {businessInfo?.onlineLink || "없음"}
            </div>
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
