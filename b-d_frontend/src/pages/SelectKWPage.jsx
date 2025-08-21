import React, { useState } from "react";
import styles from "../styles/pages/SelectKWPage.module.scss";
import ProgressBar from "../components/ProfilePage/ProgressBar";
import logo from "../assets/logo.svg";
import SelectButton from "../components/SelectKWPage/SelectButton";
import { useNavigate } from "react-router-dom";
const species = [
  "음식/음료",
  "쇼핑/소매",
  "반려동물",
  "뷰티/서비스",
  "운동/건강",
  "문화/체험",
  "콘텐츠",
  "기타",
];

const atmosphere = [
  "감성적인",
  "빈티지",
  "러블리",
  "힙한",
  "직장인",
  "자연친화적",
  "조용한",
  "활기찬",
  "10대",
  "20대",
  "가족모임",
  "단체",
];

const SelectKWPage = () => {
  const [selectedSpecies, setSelectedSpecies] = useState([]); // 위 그룹 선택 상태
  const [selectedAtmosphere, setSelectedAtmosphere] = useState([]); // 아래 그룹 선택 상태
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSpeciesClick = (sp) => {
    // 버튼 중복 선택 로직
    setSelectedSpecies((prev) =>
      prev.includes(sp) ? prev.filter((item) => item !== sp) : [...prev, sp]
    );
    setShowError(false);
  };

  const handleAtmosphereClick = (kw) => {
    // 아래 그룹 버튼 중복 선택 로직
    setSelectedAtmosphere((prev) =>
      prev.includes(kw) ? prev.filter((item) => item !== kw) : [...prev, kw]
    );
    setShowError(false);
  };
  const isFormComplete =
    selectedSpecies.length > 0 && selectedAtmosphere.length > 0;

  const handleNext = () => {
    if (!isFormComplete) {
      setShowError(true);
      return;
    }
    console.log("handleNext 실행:", selectedSpecies, selectedAtmosphere);
    if (isFormComplete) {
      const storeKeywordsDataToStore = {
        categoryIds: selectedSpecies.join(", "),
        moodIds: selectedAtmosphere.join(", "),
      };

      console.log("세션 스토리지에 저장할 데이터 : ", storeKeywordsDataToStore);
      sessionStorage.setItem(
        "storeKeywordsData",
        JSON.stringify(storeKeywordsDataToStore)
      );

      // 저장확인
      const stored = sessionStorage.getItem("storeKeywordsData");
      console.log("세션 스토리지에 저장된 데이터 확인:", stored);
    }
    navigate("/store-time");
  };
  return (
    <div className={styles.container}>
      <div className={styles.whiteBox}>
        <ProgressBar progress={65} />
        <img src={logo} className={styles.logo} alt="logo" />
        <h1 className={styles.subtitle}>
          #우리 가게를 <span className={styles.highlight}>소개</span>합니다.
        </h1>
        <p className={styles.description}>
          당신의 사업장을 설명할 수 있는 키워드를 모두 골라주세요.
        </p>
        <p className={styles.keyDescription}>
          #이런_<span className={styles.highlight}>일</span>을_하고있어요.
        </p>
        <div className={styles.buttonGroup}>
          {species.map((sp) => (
            <SelectButton
              key={sp}
              selected={selectedSpecies.includes(sp)}
              onClick={() => handleSpeciesClick(sp)}
              error={showError}
            >
              #{sp}
            </SelectButton>
          ))}
        </div>
        {/*업종 button Group */}
        {showError && (
          <div className={styles.errorMsg}>
            한개 이상의 항목을 선택하여주세요.
          </div>
        )}
        <div className={styles.middleDivider}></div>
        <p className={styles.keyDescription}>
          #이런_<span className={styles.highlight}>분위기의</span>
          _가게를_운영해요.
        </p>
        <div className={styles.buttonGroup}>
          {atmosphere.map((kw) => (
            <SelectButton
              key={kw}
              selected={selectedAtmosphere.includes(kw)}
              onClick={() => handleAtmosphereClick(kw)}
              error={showError}
            >
              #{kw}
            </SelectButton>
          ))}
        </div>
        {showError && (
          <div className={styles.errorMsg}>
            한개 이상의 항목을 선택하여주세요.
          </div>
        )}

        <div className={styles.signupLink}>
          <span
            className={styles.findPwd}
            onClick={() => {
              navigate("/find-password");
            }}
          >
            비밀번호 찾기
          </span>
          <span className={styles.divider}> | </span>
          <span
            className={styles.loginLink}
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </span>
        </div>

        <button
          type="submit"
          className={`${styles.submitBtn} ${
            isFormComplete ? styles.active : ""
          }`}
          onClick={handleNext}
        >
          다음으로
        </button>
      </div>
    </div>
  );
};

export default SelectKWPage;
