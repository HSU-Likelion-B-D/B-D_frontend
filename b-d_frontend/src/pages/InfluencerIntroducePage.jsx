import React, { useState } from "react";
import styles from "../styles/pages/InfluencerIntroducePage.module.scss";
import ProgressBar from "../components/ProfilePage/ProgressBar";
import Input from "../components/SingupPage/Input";
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

const InfluencerIntroducePage = () => {
  const [formData, setFormData] = useState({
    infname: "",
  });
  const [selected, setSelected] = useState([]);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
          #저를 <span className={styles.highlight}>소개</span>합니다.
        </h1>
        <p className={styles.description}>
          당신의 사업장을 설명할 수 있는 키워드를 모두 골라주세요.
        </p>
        <p className={styles.keyDescription}>#이런_일을_하고있어요.</p>
        <div className={styles.inputGroup}>
          <label className={styles.label} style={{ marginBottom: 12 }}>
            활동명<span>*</span>
          </label>
          <Input
            className={styles.input}
            name="infname"
            value={formData.ifname}
            onChange={handleInputChange}
            placeholder="활동명을 입력해주세요"
            required
            showClearButton={true}
            onClear={() => setFormData((prev) => ({ ...prev, ifname: "" }))}
          />
        </div>
        <div className={styles.buttonGroup}>
          {species.map((sp) => (
            <SelectButton
              key={sp}
              selected={selected.includes(sp)}
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
        <p className={styles.keyDescription}>#이런_분위기의_가게를_운영해요.</p>
        <div className={styles.buttonGroup}>
          {atmosphere.map((kw) => (
            <SelectButton
              key={kw}
              selected={selected.includes(kw)}
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

export default InfluencerIntroducePage;
