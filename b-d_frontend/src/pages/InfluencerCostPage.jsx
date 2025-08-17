import React, { useState } from "react";
import styles from "../styles/pages/InfluencerCostPage.module.scss";
import ProgressBar from "../components/ProfilePage/ProgressBar";
import logo from "../assets/logo.svg";
import SelectButton from "../components/SelectKWPage/SelectButton";
import { useNavigate } from "react-router-dom";

const atmosphere = [
  "음식/음료",
  "인스타그램",
  "쇼핑/소매",
  "반려동물",
  "뷰티/서비스",
  "운동/건강",
  "숏폼",
  "문화/체험",
  "콘텐츠",
  "기타",
];

const InfluencerCostPage = () => {
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
        <p className={styles.description}>거의 다 왔어요! 조금만 더 힘내요!</p>
        <p className={styles.keyDescription}>
          희망하는 홍보 요청 금액을 정해주세요!
        </p>

        <p className={styles.keyDescription}>#이런_업종/분야를_원해요.</p>
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

export default InfluencerCostPage;
