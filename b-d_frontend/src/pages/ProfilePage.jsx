import React, { useState, useEffect } from "react";
import styles from "../styles/pages/ProfilePage.module.scss";
import { logo, camera, profile } from "@/assets";
import ProgressBar from "../components/ProfilePage/ProgressBar";
import GalleryPopup from "../components/ProfilePage/GalleryPopup";
import Input from "../components/SingupPage/Input";
import { Form, useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axiosInstanceFormData";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    nickname: "",
    description: "",
    profileImage: "",
  });
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(profile);
  const [profileImageFile, setProfileImageFile] = useState(""); // 파일 객체 저장용
  const [hasExistingProfile, setHasExistingProfile] = useState(false); // 기존 프로필 존재 여부

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axiosInstance
        .get("/bd/user/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log("API 응답 전체:", res);
          console.log("API 응답 데이터:", res.data);

          // API 응답 구조에 따라 데이터 추출 (여러 가능한 구조 시도)
          const responseData = res.data.data || res.data.result || res.data;
          console.log("추출된 데이터:", responseData);

          // 각 필드별로 값 확인
          console.log("nickname 값:", responseData.nickname);
          console.log("introduction 값:", responseData.introduction);
          console.log("profileImage 값:", responseData.profileImage);

          // 기존 프로필 정보가 있는지 확인
          const hasProfile =
            responseData.nickname ||
            responseData.introduction ||
            responseData.profileImage;
          setHasExistingProfile(!!hasProfile);

          setFormData((prevData) => {
            const newData = {
              ...prevData,
              nickname: responseData.nickname || "",
              description: responseData.introduction || "",
            };
            console.log("새로 설정된 formData:", newData);
            return newData;
          });

          if (responseData.profileImage) {
            setProfileImage(responseData.profileImage);
          }
        })
        .catch((error) => {
          console.error("프로필 정보 가져오기 오류:", error);
          // 오류 발생 시 기본값 유지
        });
    }
  }, []);

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
    if (!(nickname || "").trim()) {
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
          // 서버 응답에서 nickname 추출하여 세션스토리지에 저장
          const nickname = res.data.nickname;
          sessionStorage.setItem("nickname", nickname);
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
      // 파일 객체 저장 (FormData 전송용)
      setProfileImageFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid =
    (formData.nickname || "").trim() !== "" &&
    (formData.description || "").trim() !== "";

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

  const handleNext = () => {
    console.log("handleNext 실행:", { formData, profileImage });

    const userId = sessionStorage.getItem("userId"); // 세션 스토리지에서 userId 가져오기
    const nickname = formData.nickname; // formData에서 닉네임 가져오기

    // 닉네임을 세션 스토리지에 저장
    localStorage.setItem("nickName", nickname);
    localStorage.setItem("imgUrl", profileImage);

    // FormData 객체 생성
    const formDataToSend = new FormData();

    if (!hasExistingProfile) {
      // POST 요청 (새 프로필 생성) - userId 포함
      formDataToSend.append("userId", userId);
    }

    formDataToSend.append("nickname", nickname); // 닉네임

    // profileImageFile이 존재할 경우에만 추가
    if (profileImageFile) {
      formDataToSend.append("profileImage", profileImageFile); // 파일 객체 전송
    } else {
      console.log("프로필 사진이 없으므로 전송하지 않습니다.");
    }

    formDataToSend.append("introduction", formData.description); // 설명글

    // PUT 요청 시 추가 필드
    if (hasExistingProfile) {
      formDataToSend.append("imageDelete", "false"); // 기존 프로필 이미지 유지
      formDataToSend.append("introductionDelete", "false"); // 기존 설명글 유지
    }

    // FormData 내용 확인하기
    console.log("FormData 내용:");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }

    // 서버로 데이터 전송 (기존 프로필이 있으면 PUT, 없으면 POST)
    const method = hasExistingProfile ? "put" : "post";
    const url = hasExistingProfile ? "/bd/user/update" : "/bd/user/profile";

    console.log(
      `프로필 ${hasExistingProfile ? "수정" : "생성"} 요청:`,
      method,
      url
    );

    // 헤더 설정 (PUT 요청 시 토큰 포함)
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    if (hasExistingProfile) {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    axiosInstance[method](url, formDataToSend, {
      headers,
    })
      .then((res) => {
        console.log(
          `프로필 ${hasExistingProfile ? "수정" : "생성"} 응답:`,
          res
        );
        if (res.data.isSuccess) {
          navigate("/address"); // 성공시 다음 페이지로 이동
        }
      })
      .catch((error) => {
        console.error(
          `프로필 ${hasExistingProfile ? "수정" : "생성"} 오류:`,
          error
        );
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
                가게 이름<span style={{ color: "#FF0000" }}>*</span>
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
              handleNext();
            }}
          >
            {hasExistingProfile ? "수정하기" : "다음으로"}
          </button>
        </div>
      </form>
      {isGalleryOpen && <GalleryPopup onClose={toggleGallery} />}
    </div>
  );
};

export default ProfilePage;
