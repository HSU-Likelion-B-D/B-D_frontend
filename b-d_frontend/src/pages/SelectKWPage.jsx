import React, { useState } from "react";
import styles from "../styles/pages/SelectKWPage.module.scss";
import ProgressBar from "../components/ProfilePage/ProgressBar";
import logo from "../assets/logo.svg";
import SelectButton from "../components/SelectKWPage/SelectButton";

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

const atmosphere = [];

const SelectKWPage = () => {
  const [selected, setSelected] = useState([]);
  const [showError, setShowError] = useState(false);

  const handleClick = (sp) => {
    // 버튼 중복 선택 로직
    setSelected((prev) =>
      prev.includes(sp) ? prev.filter((item) => item !== sp) : [...prev, sp]
    );
    setShowError(false);
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
        <p className={styles.description}>
          #이런_<span className={styles.highlight}>일</span>을_하고있어요.
        </p>
        <div className={styles.buttonGroup}>
          {species.map((sp) => (
            <SelectButton
              key={sp}
              selected={selected.includes(sp)}
              onClick={() => handleClick(sp)}
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
      </div>
    </div>
  );
};

export default SelectKWPage;
