import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/StartPage.module.scss";
import SelectBox from "@/components/StartPage/SelectBox";
import { logo, main_dilly, main_busy } from "@/assets";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/apis/axiosInstance";
function StartPage() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [signupData, setSignupData] = useState(null);
  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  useEffect(() => {
    const storedSignupData = sessionStorage.getItem("signupData");

    if (storedSignupData) {
      try {
        const parsedData = JSON.parse(storedSignupData);
        setSignupData(parsedData);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("세션스토리지에 signupData가 없습니다.");
    }
  }, []);

  const handleNext = () => {
    console.log("handleNext 실행:", { signupData, selectedType });

    if (!signupData || !selectedType) {
      console.error("필수 데이터가 누락되었습니다:", {
        signupData,
        selectedType,
      });
      return;
    }

    axiosInstance
      .post("/bd/user/signup", {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        role: selectedType,
      })
      .then((res) => {
        console.log("회원가입 응답:", res);
        navigate(`/${selectedType}-profile`);
        sessionStorage.removeItem("signupData");

        // 서버 응답에서 userId와 userRoleType 추출하여 세션스토리지에 저장
        const userId = res.data.userId;
        const userRoleType = res.data.userRoleType;

        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("userRoleType", userRoleType);
      })
      .catch((error) => {
        console.error("회원가입 오류:", error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img className={styles.logo} src={logo} alt="logo" />
        <div className={styles.title}>
          반가워요!
          <br />
          <span>당신의 유형</span>을 선택해주세요.
        </div>
        <div className={styles.description}>
          비디가 당신의 활동을 도와드릴게요.
        </div>
        <div className={styles.selectBoxContainer}>
          <SelectBox
            title="자영업자"
            content1="인플루언서와의 공생관계"
            content2="가게를 홍보할 수 있어요!"
            onClick={() => handleSelectType("business")}
            selected={selectedType === "business"}
            style={{
              textAlign: "end",
            }}
          />
          <img className={styles.seaAnemone} src={main_busy} alt="seaAnemone" />
          <SelectBox
            title="인플루언서"
            content1="협찬을 통한"
            content2="여러 콜라보 활동을 할 수 있어요!"
            onClick={() => handleSelectType("influencer")}
            selected={selectedType === "influencer"}
            style={{
              textAlign: "start",
            }}
          />
          <img className={styles.nemo} src={main_dilly} alt="nemo" />
        </div>
        <button
          className={`${styles.button} ${
            selectedType ? styles.active : styles.disabled
          }`}
          disabled={!selectedType}
          onClick={() => {
            handleNext();
          }}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}

export default StartPage;
