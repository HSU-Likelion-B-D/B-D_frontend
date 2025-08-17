import React, { useState } from "react";
import styles from "../styles/pages/InfluencerAccountPage.module.scss";
import { logo, camera, profile, influencer_profile } from "@/assets";
import ProgressBar from "../components/ProfilePage/ProgressBar";
import GalleryPopup from "../components/ProfilePage/GalleryPopup";
import Input from "../components/SingupPage/Input";
import { useNavigate } from "react-router-dom";

const mockNicknames = ["사자보이즈", "사자", "사자보이즈앤걸스"];
const InfluencerAccountPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: "",
    description: "",
  });
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(profile);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "nickname") {
      setNicknameMessage("");
      setIsError(false);
      setIsSuccess(false);
      setIsButtonDisabled(false); // 버튼 reset
    }
  };

  const handleNicknameCheck = () => {
    const { nickname } = formData;
    if (!nickname.trim()) {
      setNicknameMessage("닉네임을 입력해주세요.");
      setIsError(true);
      setIsSuccess(false);
      return;
    }

    // 닉네임 중복 확인 로직 (예: 서버 요청)
    const isDuplicate = mockNicknames.includes(nickname); // 예시 중복 닉네임 리스트

    setIsButtonDisabled(true); // 버튼을 회색으로 변경

    if (isDuplicate) {
      setNicknameMessage("이미 닉네임이 존재합니다.");
      setIsError(true);
      setIsSuccess(false);
    } else {
      setNicknameMessage("멋진 닉네임이군요!");
      setIsError(false);
      setIsSuccess(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    // `formData` 백으로 보내기
  };

  const toggleGallery = () => {
    setIsGalleryOpen((prev) => !prev);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid =
    formData.nickname.trim() !== "" && formData.description.trim() !== "";

  const clearNickname = () => {
    setFormData((prevData) => ({
      ...prevData,
      nickname: "",
    }));
    setNicknameMessage("");
    setIsError(false);
    setIsSuccess(false);
    setIsButtonDisabled(false);
  };

  return (
    <div className={styles.whole}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.whiteBox}>
          <ProgressBar progress={25} />
          <img src={logo} className={styles.logo} alt="logo" />
          <h1 className={styles.subtitle}>
            <span className={styles.highlight}>당신</span>을 알려주세요!
          </h1>
          <p className={styles.description}>비디는 당신이 궁금해요.</p>

          <div className={styles.profileSection}>
            <img
              src={influencer_profile}
              alt="Profile"
              className={styles.profileImage}
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.nicknameGroup}>
              <label htmlFor="nickname" className={styles.label}>
                닉네임<span>*</span>
              </label>
              <div className={styles.nicknameContainer}>
                <Input
                  id="nickname"
                  name="nickname"
                  type="text"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  placeholder="닉네임을 입력하세요"
                  showClearButton={true}
                  xButtonClassName={styles.profileXButton}
                  onClear={clearNickname}
                  className={`${styles.input} ${
                    isError ? styles.errorInput : ""
                  } ${isSuccess ? styles.successInput : ""}`}
                />

                <button
                  type="button"
                  className={`${styles.checkButton} ${
                    isButtonDisabled ? styles.disabled : ""
                  }`}
                  onClick={handleNicknameCheck}
                  disabled={isButtonDisabled}
                >
                  중복확인
                </button>
              </div>
              {nicknameMessage && (
                <p
                  className={
                    isError ? styles.errorMessage : styles.successMessage
                  }
                >
                  {nicknameMessage}
                </p>
              )}
            </div>

            <textarea
              name="description"
              placeholder="가게를 간단히 소개해주세요."
              value={formData.description}
              onChange={handleInputChange}
              className={styles.textarea}
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
              !isFormValid ? styles.disabled : ""
            }`}
            disabled={!isFormValid}
          >
            다음으로
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfluencerAccountPage;
