import React, { useState } from "react";
import ProgressBar from "../components/ProfilePage/ProgressBar";
import styles from "../styles/pages/AddressPage.module.scss";
import logo from "../assets/logo.svg";
import Input from "../components/SingupPage/Input";
import { useNavigate } from "react-router-dom";
const AddressPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    detailAddress: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const clearAddress = () => {
    setFormData((prevData) => ({
      ...prevData,
      address: "",
    }));
  };

  const isFormValid = formData.address.trim() !== "";
  return (
    <div className={styles.container}>
      <div className={styles.whiteBox}>
        <ProgressBar progress={35} />
        <img src={logo} className={styles.logo} alt="logo" />
        <h1 className={styles.subtitle}>
          당신의 <span className={styles.highlight}>가게</span>를 알려주세요!
        </h1>
        <p className={styles.description}>
          거의 다왔어요! 비디가 당신을 분석하고 있어요.
        </p>
        <div className={styles.addressPlaceGroup}>
          <label htmlFor="nickname" className={styles.label}>
            사업장 주소<span>*</span>
          </label>
          <div className={styles.addressInputGroup}>
            <div className={styles.addressContainer}>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="사업장을 주소를 입력하세요"
                value={formData.address}
                showClearButton={true}
                onChange={handleInputChange}
                onClear={clearAddress}
                className={styles.input}
              />
              <button type="button" className={styles.searchButton}>
                검색
              </button>
            </div>
            <Input
              id="detailAddress"
              name="detailAddress"
              type="text"
              value={formData.detailAddress}
              placeholder="상세 주소"
              showClearButton={false}
              className={styles.detailInput}
              onChange={handleInputChange}
            />

            <div className={styles.addressDescription}>
              <p className={styles.address1}>
                EX) 서울특별시 성북구 삼선교로 16길 116
              </p>
              <p className={styles.address2}>서울특별시 송파구 올림픽로 300</p>
            </div>
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
      {/*whiteBox 닫는 div */}
    </div>
  );
};

export default AddressPage;
