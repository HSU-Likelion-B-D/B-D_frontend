import React, { useState } from "react";
import styles from "../styles/pages/SelectKWPage.module.scss";
import ProgressBar from "../components/ProfilePage/ProgressBar";
import logo from "../assets/logo.svg";
import SelectButton from "../components/SelectKWPage/SelectButton";
import { useNavigate } from "react-router-dom";
const species = [
  { id: 1, name: "음식/음료" },
  { id: 2, name: "쇼핑/소매" },
  { id: 3, name: "반려동물" },
  { id: 4, name: "뷰티/서비스" },
  { id: 5, name: "운동/건강" },
  { id: 6, name: "문화/체험" },
  { id: 7, name: "콘텐츠" },
  { id: 8, name: "기타" },
];

const atmosphere = [
  { id: 1, name: "감성적인" },
  { id: 2, name: "빈티지" },
  { id: 3, name: "러블리" },
  { id: 4, name: "힙한" },
  { id: 5, name: "직장인" },
  { id: 6, name: "자연친화적" },
  { id: 7, name: "조용한" },
  { id: 8, name: "활기찬" },
  { id: 9, name: "10대" },
  { id: 10, name: "20대" },
  { id: 11, name: "가족모임" },
  { id: 12, name: "단체" },
];

const SelectKWPage = () => {
  const [selectedSpecies, setSelectedSpecies] = useState([]); // 위 그룹 선택 상태
  const [selectedAtmosphere, setSelectedAtmosphere] = useState([]); // 아래 그룹 선택 상태
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSpeciesClick = (sp) => {
    // 버튼 중복 선택 로직
    setSelectedSpecies((prev) =>
      prev.some((item) => item.id === sp.id)
        ? prev.filter((item) => item.id !== sp.id)
        : [...prev, sp]
    );
    setShowError(false);
  };

  const handleAtmosphereClick = (kw) => {
    // 아래 그룹 버튼 중복 선택 로직
    setSelectedAtmosphere((prev) =>
      prev.some((item) => item.id === kw.id)
        ? prev.filter((item) => item.id !== kw.id)
        : [...prev, kw]
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
      sessionStorage.setItem(
        "storeSpeciesData",
        JSON.stringify({ categoryIds: selectedSpecies.map((item) => item.id) })
      );
      sessionStorage.setItem(
        "storeAtmosphereData",
        JSON.stringify({ moodIds: selectedAtmosphere.map((item) => item.id) })
      );

      // 저장확인
      const storedSpecies = sessionStorage.getItem("storeSpeciesData");
      const storedAtmosphere = sessionStorage.getItem("storeAtmosphereData");
      console.log("세션 스토리지에 저장된 데이터 확인:", {
        storedSpecies,
        storedAtmosphere,
      });
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
              key={sp.id}
              selected={selectedSpecies.some((item) => item.id === sp.id)}
              onClick={() => handleSpeciesClick(sp)}
              error={showError}
            >
              #{sp.name}
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
              key={kw.id}
              selected={selectedAtmosphere.some((item) => item.id === kw.id)}
              onClick={() => handleAtmosphereClick(kw)}
              error={showError}
            >
              #{kw.name}
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
