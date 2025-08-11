import React, { useState } from "react";
import styles from "../styles/pages/ProfilePage.module.scss";

const mockNicknames = ["사자보이즈", "사자", "사자보이즈앤걸스"];

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    description: "",
  });
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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

    // 버튼 상태를 다시 활성화
    setTimeout(() => setIsButtonDisabled(false), 2000); // 2초 후 버튼 활성화
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    // Here, you can send `formData` to your API or database
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h1 className={styles.subtitle}>
        <span className={styles.highlight}>당신</span>을 알려주세요!
      </h1>
      <label htmlFor="nickname" className={styles.label}>
        닉네임<span>*</span>
      </label>
      <div className={styles.nicknameContainer}>
        <input
          id="nickname"
          name="nickname"
          type="text"
          value={formData.nickname}
          onChange={handleInputChange}
          placeholder="닉네임을 입력하세요"
          className={`${styles.input} ${isError ? styles.errorInput : ""} ${
            isSuccess ? styles.successInput : ""
          }`}
        />
        <button
          type="button"
          className={`${styles.checkButton} ${
            isButtonDisabled ? "disabled" : ""
          }`}
          onClick={handleNicknameCheck}
          disabled={isButtonDisabled}
        >
          중복확인
        </button>
      </div>
      {nicknameMessage && (
        <p className={isError ? styles.errorMessage : styles.successMessage}>
          {nicknameMessage}
        </p>
      )}
      <textarea
        name="description"
        placeholder="가게를 간단히 소개해주세요."
        value={formData.description}
        onChange={handleInputChange}
        className={styles.input}
      />
      <button type="submit" className={styles.submitBtn}>
        다음으로
      </button>
    </form>
  );
};

export default ProfilePage;
