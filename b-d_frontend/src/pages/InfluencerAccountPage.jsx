import React, { useState } from "react";
import styles from "../styles/pages/InfluencerAccountPage.module.scss";
import { logo, camera, profile, influencer_profile } from "@/assets";
import ProgressBar from "../components/ProfilePage/ProgressBar";
import Input from "../components/SingupPage/Input";

import { useNavigate } from "react-router-dom";

const mockNicknames = ["사자보이즈", "사자", "사자보이즈앤걸스"];
const InfluencerAccountPage = () => {
  // 은행 리스트 직접 선언
  const BANK_LIST = [
    "카카오뱅크",
    "국민은행",
    "신한은행",
    "우리은행",
    "하나은행",
    "농협은행",
    "기업은행",
    "토스뱅크",
    "SC제일은행",
    "씨티은행",
    "수협은행",
    "대구은행",
    "부산은행",
    "광주은행",
    "전북은행",
    "경남은행",
    "제주은행",
    "케이뱅크",
    "산업은행",
    "새마을금고",
    "신협",
    "우체국",
    "저축은행",
  ];
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: "",
    description: "",
    bank: "",
    account: "",
  });

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
    // 계좌번호 입력 시 숫자와 -만 허용
    if (name === "account") {
      const onlyNumDash = value.replace(/[^0-9-]/g, "");
      setFormData((prevData) => ({ ...prevData, account: onlyNumDash }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    // `formData` 백으로 보내기
  };

  const isFormValid =
    formData.bank.trim() !== "" && formData.account.trim() !== "";

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
            <label className={styles.label} style={{ marginBottom: 12 }}>
              계좌입력<span>*</span>
            </label>
            <div className={styles.accountInputGroup}>
              <select
                className={styles.bankSelect}
                name="bank"
                value={formData.bank}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled hidden>
                  은행선택
                </option>
                {BANK_LIST.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
              <Input
                className={styles.accountInput}
                name="account"
                value={formData.account}
                onChange={handleInputChange}
                placeholder="7777-7777-7777"
                required
                showClearButton={true}
                xButtonClassName={styles.profileXButton}
                onClear={() =>
                  setFormData((prev) => ({ ...prev, account: "" }))
                }
              />
            </div>
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
