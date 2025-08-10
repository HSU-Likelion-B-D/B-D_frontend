import React, { useState } from "react";
import logo from "../assets/logo.svg";
import styles from "../styles/pages/ProfilePage.module.scss";
import Input from "../components/SingupPage/Input";
import Button from "../components/SingupPage/Button";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  // 프로필 이미지 변경 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.whiteBox}>
        <img src={logo} className={styles.logo} alt="logo" />
        <p className={styles.subtitle}>
          <span className={styles.highlight}>당신</span>을 알려주세요!
        </p>
        <p className={styles.description}>비디는 당신이 궁금해요.</p>

        <label htmlFor="imageUpload">
          <img
            src={selectedImage || "/default-profile.png"} // 기본 이미지
            className={styles.profileImage}
          />
        </label>

        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          style={{ display: "none" }} // 파일 선택 input 숨김
          onChange={handleImageChange}
        />

        <Input
          label="닉네임"
          className={styles.input}
          placeholder="닉네임을 입력하세요"
          required={true} // * 표시
        />
        <Button className={styles.CheckButton}>중복확인</Button>
        <Input
          className={styles.introduction}
          placeholder="가게를 간단히 소개해주세요."
          showClearButton={false}
        />

        <div className={styles.signupLink}>
          <span className={styles.findPwd}>비밀번호 찾기</span>
          <span className={styles.divider}> | </span>
          <span className={styles.loginLink}>로그인</span>
        </div>

        <Button type="submit" className={styles.submitBtn}>
          다음으로
        </Button>
      </div>
      {/* white box 닫는 div */}
      {/* container 닫는 div */}
    </div>
  );
};

export default ProfilePage;
