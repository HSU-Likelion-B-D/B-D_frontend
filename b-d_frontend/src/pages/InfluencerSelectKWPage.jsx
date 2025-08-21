import React, { useState } from "react";
import styles from "../styles/pages/InfluencerSelectKWPage.module.scss";
import ProgressBar from "../components/InfluencerProfilePage/ProgressBar";
import { logo_red } from "../assets";
import SelectButton from "../components/SelectKWPage/SelectButton";
import { useNavigate } from "react-router-dom";
const species = [
  { id: 1, name: "정보전달" },
  { id: 2, name: "유머/유쾌 중심" },
  { id: 3, name: "감정중심" },
  { id: 4, name: "일상공유" },
  { id: 5, name: "예술/감각적" },
  { id: 6, name: "도전/이벤트형" },
  { id: 7, name: "트렌디한" },
  { id: 8, name: "기타" },
];

const atmosphere = [
  { id: 1, name: "음식/카페" },
  { id: 2, name: "뷰티" },
  { id: 3, name: "패션" },
  { id: 4, name: "운동" },
  { id: 5, name: "키즈" },
  { id: 6, name: "교육/정보" },
  { id: 7, name: "VLOG" },
  { id: 8, name: "게임/IT" },
  { id: 9, name: "반려동물" },
  { id: 10, name: "영화/드라마" },
  { id: 11, name: "음악/댄스" },
  { id: 12, name: "기타" },
];

const InfluencerSelectKWPage = () => {
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [selectedAtmosphere, setSelectedAtmosphere] = useState([]);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSpeciesClick = (sp) => {
    setSelectedSpecies((prev) =>
      prev.some((item) => item.id === sp.id)
        ? prev.filter((item) => item.id !== sp.id)
        : [...prev, sp]
    );
    setShowError(false);
  };

  const handleAtmosphereClick = (kw) => {
    setSelectedAtmosphere((prev) =>
      prev.some((item) => item.id === kw.id)
        ? prev.filter((item) => item.id !== kw.id)
        : [...prev, kw]
    );
    setShowError(false);
  };

  const handleNext = () => {
    if (selectedSpecies.length === 0 || selectedAtmosphere.length === 0) {
      setShowError(true);
      return;
    }
    sessionStorage.setItem(
      "contentTopicIds",
      JSON.stringify(selectedSpecies.map((item) => item.id))
    );
    sessionStorage.setItem(
      "contentStyleIds",
      JSON.stringify(selectedAtmosphere.map((item) => item.id))
    );
    navigate("/influencer-cost");
  };
  return (
    <div className={styles.container}>
      <div className={styles.whiteBox}>
        <ProgressBar progress={65} />
        <img src={logo_red} className={styles.logo} alt="logo" />
        <h1 className={styles.subtitle}>
          #저를 <span className={styles.highlight}>소개</span>합니다.
        </h1>
        <p className={styles.description}>
          당신을 설명할 수 있는 키워드를 모두 골라주세요.
        </p>
        <p className={styles.keyDescription}>
          #이런_<span className={styles.highlight}>주제</span>를_다루고 있어요.
        </p>
        <div className={styles.buttonGroup}>
          {species.map((sp) => (
            <SelectButton
              key={sp.id}
              redSelected={selectedSpecies.some((item) => item.id === sp.id)}
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
          #이런_<span className={styles.highlight}>컨텐츠</span>
          를_다루고_있어요.
        </p>
        <div className={styles.buttonGroup}>
          {atmosphere.map((kw) => (
            <SelectButton
              key={kw.id}
              redSelected={selectedAtmosphere.some((item) => item.id === kw.id)}
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
            selectedSpecies.length > 0 && selectedAtmosphere.length > 0
              ? styles.active
              : ""
          }`}
          onClick={handleNext}
        >
          다음으로
        </button>
      </div>
    </div>
  );
};

export default InfluencerSelectKWPage;
