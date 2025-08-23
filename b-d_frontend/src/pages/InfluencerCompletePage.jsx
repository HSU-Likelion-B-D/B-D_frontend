import React from "react";
import styles from "../styles/pages/InfluencerCompletePage.module.scss";
import { logo_red, complete_icon } from "@/assets";
import axiosInstance from "@/apis/axiosInstance";
import axiosInstanceGET from "@/apis/axiosInstanceGET";
import { useNavigate } from "react-router-dom";

const InfluencerCompletePage = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    const requestData = {
      userId: sessionStorage.getItem("userId"),
      activityName: sessionStorage.getItem("activityName"),
      followerCount: parseInt(sessionStorage.getItem("followerCount")),
      uploadFrequency: sessionStorage.getItem("uploadFrequency"),
      snsUrl: sessionStorage.getItem("snsUrl"),
      platformIds: JSON.parse(sessionStorage.getItem("platformIds")),
      contentTopicIds: JSON.parse(sessionStorage.getItem("contentTopicIds")),
      minBudget: sessionStorage.getItem("minAmount"),
      maxBudget: sessionStorage.getItem("maxAmount"),
      bankName: sessionStorage.getItem("bankName"),
      accountNumber: sessionStorage.getItem("accountNumber"),
      contentStyleIds: JSON.parse(sessionStorage.getItem("contentStyleIds")),
      preferTopicIds: JSON.parse(sessionStorage.getItem("preferTopicIds")),
    };

    console.log(requestData);

    // 토큰 존재 여부에 따라 POST/PUT 선택
    const accessToken = localStorage.getItem("accessToken");
    const method = accessToken ? "put" : "post";
    const url = accessToken
      ? "/bd/api/influencer/activities"
      : "/bd/api/influencer/activities";
    const selectedAxiosInstance = accessToken
      ? axiosInstanceGET
      : axiosInstance;

    console.log(
      `인플루언서 활동 ${accessToken ? "수정" : "등록"} 요청:`,
      method,
      url
    );

    selectedAxiosInstance[method](url, requestData).then((res) => {
      console.log(res);
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("activityName");
      sessionStorage.removeItem("followerCount");
      sessionStorage.removeItem("uploadFrequency");
      sessionStorage.removeItem("snsUrl");
      sessionStorage.removeItem("platformIds");
      sessionStorage.removeItem("contentTopicIds");
      sessionStorage.removeItem("minAmount");
      sessionStorage.removeItem("maxAmount");
      sessionStorage.removeItem("bankName");
      sessionStorage.removeItem("accountNumber");
      sessionStorage.removeItem("contentStyleIds");
      sessionStorage.removeItem("preferTopicIds");
      navigate("/influencer-main");
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.whiteBox}>
        <img src={logo_red} className={styles.logo} alt="logo" />
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
          onClick={handleSubmit}
        >
          다음으로
        </button>
      </div>
    </div>
  );
};

export default InfluencerCompletePage;
