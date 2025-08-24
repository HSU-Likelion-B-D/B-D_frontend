import React, { useState, useEffect } from "react";
import styles from "../styles/pages/InfluencerIntroducePage.module.scss";
import ProgressBar from "../components/InfluencerProfilePage/ProgressBar";
import Input from "../components/SingupPage/Input";
import { logo_red } from "../assets";
import SelectButton from "../components/SelectKWPage/SelectButton";
import { useNavigate } from "react-router-dom";
const species = [
  { id: 1, name: "인스타그램" },
  { id: 2, name: "유튜브" },
  { id: 3, name: "블로그" },
  { id: 4, name: "틱톡" },
  { id: 5, name: "릴스" },
  { id: 6, name: "쇼츠" },
  { id: 7, name: "페이스북" },
  { id: 8, name: "기타" },
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

  useEffect(() => {
    // 세션스토리지에서 저장된 활동 정보 가져오기
    const storedActivityName = sessionStorage.getItem("activityName");
    const storedSnsUrl = sessionStorage.getItem("snsUrl");
    const storedFollowerCount = sessionStorage.getItem("followerCount");
    const storedUploadFrequency = sessionStorage.getItem("uploadFrequency");
    const storedPlatformIds = sessionStorage.getItem("platformIds");

    if (
      storedActivityName ||
      storedSnsUrl ||
      storedFollowerCount ||
      storedUploadFrequency ||
      storedPlatformIds
    ) {
      setFormData((prevData) => ({
        ...prevData,
        infname: storedActivityName !== undefined ? storedActivityName : "",
        platformUrl: storedSnsUrl !== "undefined" ? storedSnsUrl : "",
        followers: storedFollowerCount !== undefined ? storedFollowerCount : "",
        uploadFrequency:
          storedUploadFrequency !== undefined ? storedUploadFrequency : "",
      }));

      // 플랫폼 ID가 있으면 selected 상태에 설정
      if (storedPlatformIds) {
        try {
          const platformIds = JSON.parse(storedPlatformIds);
          const selectedPlatforms = species.filter((sp) =>
            platformIds.includes(sp.id)
          );
          setSelected(selectedPlatforms);
        } catch (error) {
          console.error("플랫폼 ID 파싱 오류:", error);
        }
      }
    }
  }, []);

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
      prev.some((item) => item.id === sp.id)
        ? prev.filter((item) => item.id !== sp.id)
        : [...prev, sp]
    );
    setShowError(false);
  };

  // 모든 필드에 입력을 해야지만 다음 버튼 활성화
  const handleNext = () => {
    if (
      !formData.infname ||
      !formData.followers ||
      !formData.uploadFrequency ||
      !formData.platformUrl ||
      selected.length === 0
    ) {
      setShowError(true);
      return;
    } else {
      sessionStorage.setItem("activityName", formData.infname);
      sessionStorage.setItem("followerCount", formData.followers);
      sessionStorage.setItem("uploadFrequency", formData.uploadFrequency);
      sessionStorage.setItem("snsUrl", formData.platformUrl);
      sessionStorage.setItem(
        "platformIds",
        JSON.stringify(selected.map((item) => item.id))
      );
      navigate("/influencer-select-keyword");
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
        <img src={logo_red} className={styles.logo} alt="logo" />
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
            value={formData.infname}
            onChange={handleInputChange}
            placeholder="활동명을 입력해주세요"
            required
            showClearButton={true}
            onClear={() => setFormData((prev) => ({ ...prev, infname: "" }))}
          />
        </div>
        <div className={styles.buttonGroup}>
          {species.map((sp) => (
            <SelectButton
              key={sp.id}
              redSelected={selected.some((item) => item.id === sp.id)}
              onClick={() => handleClick(sp)}
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
                value="4"
                onChange={handleInputChange}
              />
              5회~6회
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="uploadFrequency"
                value="5"
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
