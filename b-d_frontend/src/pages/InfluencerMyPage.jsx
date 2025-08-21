import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/InfluencerMyPage.module.scss";
import Profile from "@/components/InfluencerMainPage/Profile";
import Header from "@/components/InfluencerMainPage/Header";
import SelectButton from "@/components/SelectKWPage/SelectButton";
import NotificationModal from "@/components/InfluencerMainPage/NotificationModal";
const species = ["음식/음료", "콘텐츠"];

const atmosphere = ["감성적인", "빈티지", "러블리"];
export default function BusinessMyPage() {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  // 페이지 마운트 시 스크롤을 상단으로 이동
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isNotificationModalOpen) {
      window.scrollTo({ top: 0 });
    }
  }, [isNotificationModalOpen]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header setIsNotificationModalOpen={setIsNotificationModalOpen} />
        <div className={styles.topContainer}>
          <div className={styles.profileContainer}>
            <Profile />
          </div>
          <div className={styles.infoContainer}>
            @https://www.instagram.com/younghotyellow94/
          </div>
          <div className={styles.moneyContainer}>
            요청 금액 <span>100,000</span>
            <br />
            <span>블로그, 인스타그램</span> 선호
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.bottomContainer}>
          <div className={styles.bottomContent}>
            <div className={styles.bottomTitle}>
              #저를_<span>소개</span>합니다.
            </div>
            <div className={styles.buttonGroup}>
              {species.map((sp) => (
                <SelectButton key={sp}>#{sp}</SelectButton>
              ))}
            </div>
          </div>
          <div className={styles.bottomContent}>
            <div className={styles.bottomTitle}>
              #제가_<span>선호</span>하는_부분은요?
            </div>
            <div className={styles.buttonGroup} id={styles.atmosphere}>
              {atmosphere.map((at) => (
                <SelectButton key={at}>#{at}</SelectButton>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.locationContainer}>
          <div className={styles.locationTitle}>
            #선호_<span>지역</span>
          </div>
          <div className={styles.locationButtonGroup}>
            {atmosphere.map((at) => (
              <SelectButton key={at}>#{at}</SelectButton>
            ))}
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
