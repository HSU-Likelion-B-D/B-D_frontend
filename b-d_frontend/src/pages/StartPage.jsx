import React, { useState } from "react";
import styles from "@/styles/pages/StartPage.module.scss";
import SelectBox from "@/components/StartPage/SelectBox";
import { logo, main_dilly, main_busy } from "@/assets";
import { useNavigate } from "react-router-dom";
function StartPage() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);

  const handleSelectType = (type) => {
    setSelectedType(type);
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
          비디가 당신의 활동을 도와드릴게요.{" "}
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
            navigate(`/${selectedType}-profile`);
          }}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}

export default StartPage;
