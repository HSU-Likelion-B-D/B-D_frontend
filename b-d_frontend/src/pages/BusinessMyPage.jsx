import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/BusinessMyPage.module.scss";
import Profile from "@/components/MainPage/Profile";
import Header from "@/components/MainPage/Header";
import SelectButton from "@/components/SelectKWPage/SelectButton";
import NotificationModal from "@/components/MainPage/NotificationModal";
import axiosInstance from "@/apis/axiosInstance";
import KakaoMap from "@/components/BusinessMyPage/KakaoMap";
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

  // useEffect(() => {
  //   axiosInstance
  //     .get("/bd/api/businessman/mypage")
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header setIsNotificationModalOpen={setIsNotificationModalOpen} />
        <div className={styles.topContainer}>
          <div className={styles.profileContainer}>
            <Profile />
          </div>
          <div className={styles.infoContainer}>
            매주 월요일 휴무
            <br />
            11:00 ~ 21:50 / 14:00 ~ 17:00 브레이크타임 / 21:00 라스트오더
            <br />
            *점심 라스트오더 14:40 / 저녁 라스트오더 21:00
          </div>
          <div className={styles.moneyContainer}>
            <span>100,000~1,000,000</span> 지급 예정 <br />
            <span>블로그, 인스타그램</span> 선호
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.bottomContainer}>
          <div className={styles.bottomContent}>
            <div className={styles.bottomTitle}>
              #이런_<span>일</span>을_하고있어요.
            </div>
            <div className={styles.buttonGroup}>
              {species.map((sp) => (
                <SelectButton key={sp}>#{sp}</SelectButton>
              ))}
            </div>
          </div>
          <div className={styles.bottomContent}>
            <div className={styles.bottomTitle}>
              #이런_<span>분위기</span>의_가게를_운영해요
            </div>
            <div className={styles.buttonGroup} id={styles.atmosphere}>
              {atmosphere.map((at) => (
                <SelectButton key={at}>#{at}</SelectButton>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.mapContainer}>
          <div className={styles.map}>
            <KakaoMap address="서울 성북구 삼선교로16길 116" />
          </div>
          <div className={styles.mapInfo}>
            <div className={styles.mapInfoTitle}>서울 종로구 대학로9길 35</div>
            <div className={styles.mapInfoContent}>
              온라인 매장 / linktr.ee/hohosikdang
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
