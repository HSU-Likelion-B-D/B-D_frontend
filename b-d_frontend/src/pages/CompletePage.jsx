import React from "react";
import styles from "../styles/pages/CompletePage.module.scss";
import { logo, complete_icon } from "@/assets";
import { useNavigate } from "react-router-dom";
import axiosInstanceGET from "@/apis/axiosInstanceGET";
import axiosInstance from "@/apis/axiosInstance";

const CompletePage = () => {
  const navigate = useNavigate();
  const handleNext = () => {
    // 세션 스토리지에서 데이터 가져오기
    const userId = parseInt(sessionStorage.getItem("userId"), 10); // 숫자로 변환
    const nickname =
      sessionStorage.getItem("nickname") || localStorage.getItem("nickName");
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
    // 서버로 전송할 데이터 구성
    const accessToken = localStorage.getItem("accessToken");

    const requestData = accessToken
      ? {
          // PUT 요청 (수정) - userId 제외
          name: nickname,
          address: addressData.address,
          detailAddress: addressData.detailAddress,
          workPlaceName: addressData.workPlaceName,
          openTime: storeTimeData.openTime,
          closeTime: storeTimeData.closeTime,
          isOnline: Boolean(storeTimeData.isOnline),
          minBudget: storeCostData.minBudget,
          maxBudget: storeCostData.maxBudget,
          categoryIds: storeSpeciesData.categoryIds.map((id) =>
            parseInt(id, 10)
          ),
          moodIds: storeAtmosphereData.moodIds.map((id) => parseInt(id, 10)),
          promotionIds: storeCostData.promotionIds.map((id) =>
            parseInt(id, 10)
          ),
        }
      : {
          // POST 요청 (등록) - userId 포함
          userId,
          name: nickname,
          address: addressData.address,
          detailAddress: addressData.detailAddress,
          workPlaceName: addressData.workPlaceName,
          openTime: storeTimeData.openTime,
          closeTime: storeTimeData.closeTime,
          isOnline: Boolean(storeTimeData.isOnline),
          minBudget: storeCostData.minBudget,
          maxBudget: storeCostData.maxBudget,
          categoryIds: storeSpeciesData.categoryIds.map((id) =>
            parseInt(id, 10)
          ),
          moodIds: storeAtmosphereData.moodIds.map((id) => parseInt(id, 10)),
          promotionIds: storeCostData.promotionIds.map((id) =>
            parseInt(id, 10)
          ),
        };

    // 요청 데이터 출력
    console.log("전송 데이터:", requestData);

    // 토큰 존재 여부에 따라 POST/PUT 선택
    const method = accessToken ? "put" : "post";
    const url = accessToken
      ? "/bd/api/businessman/workplaces"
      : "/bd/api/businessman/workplaces";
    const selectedAxiosInstance = accessToken
      ? axiosInstanceGET
      : axiosInstance;

    console.log(`가게 ${accessToken ? "수정" : "등록"} 요청:`, method, url);

    selectedAxiosInstance[method](url, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("서버 응답: ", res);
        if (res.data.isSuccess) {
          console.log(`가게 ${accessToken ? "수정" : "등록"} 성공`);
          sessionStorage.clear(); // 모든 세션 스토리지 데이터 제거
          navigate("/");
        } else {
          console.error(
            `가게 ${accessToken ? "수정" : "등록"} 실패: `,
            res.data.message
          );
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
