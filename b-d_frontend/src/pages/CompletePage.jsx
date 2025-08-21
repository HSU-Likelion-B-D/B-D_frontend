import React from "react";
import styles from "../styles/pages/CompletePage.module.scss";
import { logo, complete_icon } from "@/assets";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/apis/axiosInstance";

const CompletePage = () => {
  const navigate = useNavigate();
  const handleNext = () => {
    // 세션 스토리지에서 데이터 가져오기
    const userId = parseInt(sessionStorage.getItem("userId"), 10); // 숫자로 변환
    const nickname = sessionStorage.getItem("nickname");
    const addressData = JSON.parse(
      sessionStorage.getItem("addressData") || "{}"
    );
    const storeTimeData = JSON.parse(
      sessionStorage.getItem("storeTimeData") || "{}"
    );
    const storeCostData = JSON.parse(
      sessionStorage.getItem("storeCostData") || "{}"
    );
    const storeSpeciesData = JSON.parse(
      sessionStorage.getItem("storeSpeciesData") || "{}"
    );
    const storeAtmosphereData = JSON.parse(
      sessionStorage.getItem("storeAtmosphereData") || "{}"
    );

    // 데이터 유효성 검사
    if (
      !userId ||
      !nickname ||
      !addressData.address ||
      !storeTimeData.openTime ||
      !storeSpeciesData.categoryIds ||
      !storeAtmosphereData.moodIds
    ) {
      console.error("필수 데이터가 누락되었습니다:", {
        userId,
        nickname,
        addressData,
        storeSpeciesData,
        storeAtmosphereData,
      });
      alert(
        "필수 데이터가 누락되었습니다. 이전 페이지로 돌아가 다시 입력해주세요."
      );
      return;
    }

    // 서버로 전송할 데이터 구성
    const requestData = {
      userId,
      name: nickname,
      address: addressData.address,
      detailAddress: addressData.detailAddress,
      openTime: storeTimeData.openTime,
      closeTime: storeTimeData.closeTime,
      isOnline: Boolean(storeTimeData.isOnline), // 불리언으로 변환
      minBudget: parseInt(storeCostData.minBudget, 10), // 숫자로 변환
      maxBudget: parseInt(storeCostData.maxBudget, 10), // 숫자로 변환
      categoryIds: storeSpeciesData.categoryIds.map((id) => parseInt(id, 10)), // 숫자 배열로 변환
      moodIds: storeAtmosphereData.moodIds.map((id) => parseInt(id, 10)), // 숫자 배열로 변환
      promotionIds: storeCostData.promotionIds.map((id) => parseInt(id, 10)), // 숫자 배열로 변환
    };

    // 요청 데이터 출력
    console.log("전송 데이터:", requestData);

    axiosInstance
      .post(`/bd/api/businessman/workplaces`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("서버 응답: ", res);
        if (res.status === 200) {
          console.log("가게 등록 성공");
          navigate("/");
          sessionStorage.clear(); // 모든 세션 스토리지 데이터 제거
        } else {
          console.error("가게 등록 실패: ", res.data.message);
        }
      })
      .catch((error) => {
        console.error("서버 요청 오류 : ", error);
        console.log("전송 데이터:", JSON.stringify(requestData, null, 2));
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.whiteBox}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h1 className={styles.subtitle}>환영합니다!</h1>
        <p className={styles.description}>비디의 바다에서 펼쳐질 활동들을</p>
        <p className={styles.description}>비디가 응원할게요!</p>

        <img
          src={complete_icon}
          className={styles.completeIcon}
          alt="complete icon"
        />

        <button
          type="submit"
          className={styles.submitBtn}
          onClick={() => {
            {
              handleNext();
            }
          }}
        >
          다음으로
        </button>
      </div>
    </div>
  );
};

export default CompletePage;
