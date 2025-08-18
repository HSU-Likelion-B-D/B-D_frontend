import React, { useState } from "react";
import styles from "../styles/pages/StoreTimePage.module.scss";
import ProgressBar from "../components/ProfilePage/ProgressBar";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const StoreTimePage = () => {
  const [formData, setFormData] = useState({
    minHour: "",
    minMinute: "",
    maxHour: "",
    maxMinute: "",
    isOnlineStore: null,
  });

  const handleNext = () => {
    navigate("/store-cost");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // 숫자만 입력받고, 000 단위마다 , 추가
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const navigate = useNavigate();

  const isFormComplete =
    formData.minHour &&
    formData.minMinute &&
    formData.maxHour &&
    formData.maxMinute &&
    formData.isOnlineStore !== null;

  return (
    <div className={styles.container}>
      <div className={styles.whiteBox}>
        <ProgressBar progress={75} />
        <img src={logo} className={styles.logo} alt="logo" />
        <h1 className={styles.subtitle}>
          #우리가게를 <span className={styles.highlight}>소개</span>합니다
        </h1>
        <p className={styles.description}>거의 다 왔어요! 조금만 더 힘내요!</p>
        <p className={styles.keyDescription}>운영시간을 알려주세요.</p>
        <div className={styles.costRange}>
          <div className={styles.rangeInput}>
            <input
              type="text"
              className={styles.input}
              placeholder="00"
              name="minHour"
              value={formData.minHour}
              onChange={handleInputChange}
            />
            <span className={styles.unit}>시</span>
            <input
              type="text"
              className={styles.input}
              placeholder="00"
              name="minMinute"
              value={formData.minMinute}
              onChange={handleInputChange}
            />
            <span className={styles.unit}>분</span>
            <span className={styles.separator}>~</span>
            <input
              type="text"
              className={styles.input}
              placeholder="00"
              name="maxHour"
              value={formData.maxHour}
              onChange={handleInputChange}
            />
            <span className={styles.unit}>시</span>
            <input
              type="text"
              className={styles.input}
              placeholder="00"
              name="maxMinute"
              value={formData.maxMinute}
              onChange={handleInputChange}
            />
            <span className={styles.unit}>분</span>
          </div>
        </div>
        <div className={styles.onlineStore}>
          <div className={styles.onlineStoreTitle}>
            온라인 매장을 운영 중 인가요?
          </div>
          <div className={styles.onlineStoreButton}>
            <button
              className={`${styles.yesButton} ${
                formData.isOnlineStore === true ? styles.active : ""
              }`}
              onClick={() => setFormData({ ...formData, isOnlineStore: true })}
            >
              네
            </button>
            <button
              className={`${styles.noButton} ${
                formData.isOnlineStore === false ? styles.active : ""
              }`}
              onClick={() => setFormData({ ...formData, isOnlineStore: false })}
            >
              아니오
            </button>
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

export default StoreTimePage;
