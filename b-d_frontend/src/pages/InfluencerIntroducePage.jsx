import React, { useState } from "react";
import styles from "../styles/pages/InfluencerIntroducePage.module.scss";
import ProgressBar from "../components/ProfilePage/ProgressBar";
import Input from "../components/SingupPage/Input";
import logo from "../assets/logo.svg";
import SelectButton from "../components/SelectKWPage/SelectButton";
import { useNavigate } from "react-router-dom";
const species = [
  "인스타그램",
  "유튜브",
  "블로그",
  "틱톡",
  "릴스",
  "쇼츠",
  "페이스북",
  "기타",
];

const InfluencerIntroducePage = () => {
  const [formData, setFormData] = useState({
    infname: "",
    followers: "",
    uploadFrequency: "",
    platformUrl: "",
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
    // 다음 페이지로 이동
    // navigate("/next-page");
  };

  // 모든 필드에 입력을 해야지만 다음 버튼 활성화
  const handleNext = () => {
    if (
      !formData.ifname ||
      !formData.followers ||
      !formData.uploadFrequency ||
      !formData.platformUrl ||
      selected.length === 0
    ) {
      setShowError(true);
      return;
    }
  };

  const isFormComplete =
    formData.infname &&
    formData.followers &&
    formData.uploadFrequency &&
    formData.platformUrl &&
    selected.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.whiteBox}>
        <ProgressBar progress={65} />
        <img src={logo} className={styles.logo} alt="logo" />
        <h1 className={styles.subtitle}>
          #저를 <span className={styles.highlight}>소개</span>합니다.
        </h1>
        <p className={styles.description}>
          당신을 설명할 수 있는 키워드를 모두 골라주세요.
        </p>
        <p className={styles.keyDescription}>#제가_활동하는_플랫폼은요</p>
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

        <div className={styles.followerGroup}>
          <label className={styles.label} style={{ marginBottom: 12 }}>
            팔로워수<span>*</span>
          </label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="followers"
                value="1000"
                onChange={handleInputChange}
              />
              1천 미만
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="followers"
                value="5000"
                onChange={handleInputChange}
              />
              1천~5천
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="followers"
                value="5000"
                onChange={handleInputChange}
              />
              5천~1만
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="followers"
                value="10000"
                onChange={handleInputChange}
              />
              1만~10만
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="followers"
                value="5000"
                onChange={handleInputChange}
              />
              10만이상
            </label>
          </div>
        </div>

        <div className={styles.followerGroup}>
          <label className={styles.label} style={{ marginBottom: 12 }}>
            주 업로드 횟수<span>*</span>
          </label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="uploadFrequency"
                value="1"
                onChange={handleInputChange}
              />
              1회 미만
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="uploadFrequency"
                value="2"
                onChange={handleInputChange}
              />
              1회~2회
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="uploadFrequency"
                value="3"
                onChange={handleInputChange}
              />
              3회~4회
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="uploadFrequency"
                value="5"
                onChange={handleInputChange}
              />
              5회~6회
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="uploadFrequency"
                value="7"
                onChange={handleInputChange}
              />
              7회이상
            </label>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <Input
            className={styles.input}
            name="platformUrl"
            value={formData.platformUrl}
            onChange={handleInputChange}
            placeholder="플랫폼 URL 입력 (프로필 용도)"
            required
            showClearButton={true}
            onClear={() =>
              setFormData((prev) => ({ ...prev, platformUrl: "" }))
            }
          />
        </div>

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
          disabled={!isFormComplete}
        >
          다음으로
        </button>
      </div>
    </div>
  );
};

export default InfluencerIntroducePage;
