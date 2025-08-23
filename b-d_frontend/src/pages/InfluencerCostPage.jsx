import React, { useState, useEffect } from "react";
import styles from "../styles/pages/InfluencerCostPage.module.scss";
import ProgressBar from "../components/InfluencerProfilePage/ProgressBar";
import { logo_red } from "../assets";
import SelectButton from "../components/SelectKWPage/SelectButton";
import { useNavigate } from "react-router-dom";

const atmosphere = [
  { id: 1, name: "음식/음료" },
  { id: 2, name: "인스타그램" },
  { id: 3, name: "쇼핑/소매" },
  { id: 4, name: "반려동물" },
  { id: 5, name: "뷰티/서비스" },
  { id: 6, name: "운동/건강" },
  { id: 7, name: "숏폼" },
  { id: 8, name: "문화/체험" },
  { id: 9, name: "콘텐츠" },
  { id: 10, name: "기타" },
];

const InfluencerCostPage = () => {
  const [formData, setFormData] = useState({
    minCost: "",
    maxCost: "",
  });

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

  const [selected, setSelected] = useState([]);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 세션스토리지에서 저장된 예산 정보 가져오기
    const storedMinBudget = sessionStorage.getItem("minBudget");
    const storedMaxBudget = sessionStorage.getItem("maxBudget");

    if (storedMinBudget || storedMaxBudget) {
      setFormData((prevData) => ({
        ...prevData,
        minCost: storedMinBudget || "",
        maxCost: storedMaxBudget || "",
      }));
    }
  }, []);

  const handleClick = (kw) => {
    // 버튼 중복 선택 로직
    setSelected((prev) =>
      prev.some((item) => item.id === kw.id)
        ? prev.filter((item) => item.id !== kw.id)
        : [...prev, kw]
    );
    setShowError(false);
  };

  const isFormComplete =
    formData.minCost && formData.maxCost && selected.length > 0;

  const handleNext = () => {
    if (selected.length === 0) {
      setShowError(true);
      return;
    }

    // 선택한 업종/분야 ID 저장
    sessionStorage.setItem(
      "preferTopicIds",
      JSON.stringify(selected.map((item) => item.id))
    );

    // 비용 정보 저장
    sessionStorage.setItem("minAmount", formData.minCost);
    sessionStorage.setItem("maxAmount", formData.maxCost);

    // 다음 페이지로 이동
    navigate("/influencer-complete");
  };
  return (
    <div className={styles.container}>
      <div className={styles.whiteBox}>
        <ProgressBar progress={100} />
        <img src={logo_red} className={styles.logo} alt="logo" />
        <h1 className={styles.subtitle}>#저는 이런걸 원해요</h1>
        <p className={styles.description}>거의 다 왔어요! 조금만 더 힘내요!</p>
        <p className={styles.keyDescription}>
          희망하는 홍보 요청 금액을 정해주세요!
        </p>
        <div className={styles.costRange}>
          <div className={styles.rangeInput}>
            <input
              type="text"
              className={styles.input}
              placeholder="100,000"
              name="minCost"
              value={formData.minCost}
              onChange={handleInputChange}
            />
            <span className={styles.unit}>원</span>
            <span className={styles.separator}>~</span>
            <input
              type="text"
              className={styles.input}
              placeholder="1,000,000"
              name="maxCost"
              value={formData.maxCost}
              onChange={handleInputChange}
            />
            <span className={styles.unit}>원</span>
          </div>
        </div>

        <p className={styles.keyDescription}>#이런_업종/분야를_원해요.</p>
        <div className={styles.buttonGroup}>
          {atmosphere.map((kw) => (
            <SelectButton
              key={kw.id}
              redSelected={selected.some((item) => item.id === kw.id)}
              onClick={() => handleClick(kw)}
              error={showError}
            >
              #{kw.name}
            </SelectButton>
          ))}
        </div>
        {showError && (
          <div className={styles.errorMsg}>
            한개 이상의 항목을 선택하여주세요.
          </div>
        )}

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

export default InfluencerCostPage;
