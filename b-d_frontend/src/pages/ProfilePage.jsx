import React, { useState } from "react";
import styles from "../styles/pages/ProfilePage.module.scss";
import { logo, camera, profile } from "@/assets";
import ProgressBar from "../components/ProfilePage/ProgressBar";
import GalleryPopup from "../components/ProfilePage/GalleryPopup";
import Input from "../components/SingupPage/Input";
import { Form, useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axiosInstanceFormData";

const mockNicknames = ["사자보이즈", "사자", "사자보이즈앤걸스"];
const ProfilePage = () => {
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

    setIsButtonDisabled(true); // 버튼 비활성화

    // 서버로 닉네임 중복 확인 요청
    axiosInstance
      .post(
        "/bd/user/check-nickname",
        { nickname }, // JSON 요청 데이터
        {
          headers: {
            "Content-Type": "application/json", // 요청별로 Content-Type 설정
          },
        }
      )
      .then((res) => {
        console.log("닉네임 중복 확인 응답:", res);
        if (res.data.isSuccess) {
          setNicknameMessage(res.data.message || "사용 가능한 닉네임입니다.");
          setIsError(false);
          setIsSuccess(true);
        } else {
          setNicknameMessage(res.data.message || "이미 존재하는 닉네임입니다.");
          setIsError(true);
          setIsSuccess(false);
        }
      })
      .catch((error) => {
        console.error("닉네임 중복 확인 오류:", error);
        if (error.response) {
          setNicknameMessage(
            error.response.data.message || "닉네임 확인 중 오류가 발생했습니다."
          );
        } else {
          setNicknameMessage("서버와 통신할 수 없습니다. 다시 시도해주세요.");
        }
        setIsError(true);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsButtonDisabled(false); // 요청 완료 후 버튼 상태 복구
      });
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

  const handleNext = (data, image) => {
    console.log("handleNext 실행:", { formData, profileImage });

    const userId = sessionStorage.getItem("userId"); // 세션 스토리지에서 userId 가져오기

    // FormData 객체 생성
    const formDataToSend = new FormData();
    formDataToSend.append("userId", userId); // 회원가입 후 반환된 값 사용
    formDataToSend.append("nickname", formData.nickname); // 닉네임
    formDataToSend.append("profileImage", profileImage); // 프로필 이미지 파일
    formDataToSend.append("introduction", formData.description); // 설명글

    // 서버로 데이터 전송
    axiosInstance
      .post("/bd/user/profile", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", //요청 헤더 설정
        },
      })
      .then((res) => {
        console.log("프로필 저장 응답:", res);
        if (res.data.isSuccess) {
          navigate("/address"); // 성공시 다음 페이지로 이동
        }
      })
      .catch((error) => {
        console.error("프로필 설정 오류:", error);
        if (error.response) {
          // 서버 응답이 있는 경우
          console.log(
            `오류 발생: ${error.response.status} - ${
              error.response.data.message || "서버 오류"
            }`
          );
        } else if (error.request) {
          // 요청이 이루어졌으나 응답이 없는 경우
          console.log("서버로부터 응답이 없습니다. 네트워크를 확인해주세요.");
        } else {
          // 요청 설정 중 오류 발생
          console.log("요청 설정 중 오류가 발생했습니다.");
        }
      });
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
              src={profileImage}
              alt="Profile"
              className={styles.profileImage}
            />
            <label htmlFor="fileUpload" className={styles.cameraButton}>
              <span role="img" aria-label="camera">
                <img src={camera} className={styles.cameraIcon} alt="camera" />
              </span>
            </label>
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.nicknameGroup}>
              <label htmlFor="nickname" className={styles.label}>
                닉네임<span style={{ color: "#FF0000" }}>*</span>
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
                  onClear={clearNickname}
                  className={`${styles.input} ${
                    isError ? styles.error : isSuccess ? styles.valid : ""
                  }`}
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
            onClick={() => {
              handleNext(formData, profileImage);
            }}
          >
            다음으로
          </button>
        </div>
      </form>
      {isGalleryOpen && <GalleryPopup onClose={toggleGallery} />}
    </div>
  );
};

export default ProfilePage;
