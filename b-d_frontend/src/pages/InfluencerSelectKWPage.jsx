import React, { useState } from "react";
import styles from "../styles/pages/InfluencerSelectKWPage.module.scss";
import ProgressBar from "../components/ProfilePage/ProgressBar";
import logo from "../assets/logo.svg";
import SelectButton from "../components/SelectKWPage/SelectButton";
import { useNavigate } from "react-router-dom";
const species = [
  "정보전달",
  "유머/유쾌 중심",
  "감정중심",
  "일상공유",
  "예술/감각적",
  "도전/이벤트형",
  "트렌디한",
  "기타",
];

const atmosphere = [
  "음식/카페",
  "뷰티",
  "패션",
  "운동",
  "키즈",
  "교육/정보",
  "VLOG",
  "게임/IT",
  "반려동물",
  "영화/드라마",
  "음악/댄스",
  "기타",
];

const InfluencerSelectKWPage = () => {
  const [selected, setSelected] = useState([]);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleClick = (sp) => {
    // 버튼 중복 선택 로직
    setSelected((prev) =>
      prev.includes(sp) ? prev.filter((item) => item !== sp) : [...prev, sp]
    );
    setShowError(false);
  };

  const handleNext = () => {
    if (selected.length === 0) {
      setShowError(true);
      return;
    }
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
          #이런_<span className={styles.highlight}>주제</span>를_다루고 있어요.
        </p>
        <div className={styles.buttonGroup}>
          {species.map((sp) => (
            <SelectButton
              key={sp}
              redSelected={selected.includes(sp)}
              onClick={() => handleClick(sp)}
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
          #이런_<span className={styles.highlight}>컨텐츠</span>
          를_다루고_있어요.
        </p>
        <div className={styles.buttonGroup}>
          {atmosphere.map((kw) => (
            <SelectButton
              key={kw}
              redSelected={selected.includes(kw)}
              onClick={() => handleClick(kw)}
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
            selected.length > 1 ? styles.active : ""
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
