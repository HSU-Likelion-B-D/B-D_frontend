import React, { useState } from "react";
import styles from "../styles/pages/StoreCostPage.module.scss";
import ProgressBar from "../components/ProfilePage/ProgressBar";
import logo from "../assets/logo.svg";
import SelectButton from "../components/StoreCostPage/SelectButton";
import { useNavigate } from "react-router-dom";

const atmosphere = [
  { id: 1, name: "인스타그램" },
  { id: 2, name: "유튜브" },
  { id: 3, name: "블로그" },
  { id: 4, name: "숏폼" },
  { id: 5, name: "VLOG" },
  { id: 6, name: "기타" },
];

const StoreCostPage = () => {
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

  const handleClick = (sp) => {
    // 버튼 중복 선택 로직
    setSelected((prev) =>
      prev.some((item) => item.id === sp.id)
        ? prev.filter((item) => item.id !== sp.id)
        : [...prev, sp]
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
    if (isFormComplete) {
      console.log("handleNext 실행:", formData, selected);
      // 선택된 항목에서 id 값만 추출하여 저장
      const promotionIds = selected.map((item) => item.id);

      const storeCostDataToStore = {
        minBudget: formData.minCost,
        maxBudget: formData.maxCost,
        promotionIds,
      };

      console.log("세션 스토리지에 저장할 데이터 : ", storeCostDataToStore);
      sessionStorage.setItem(
        "storeCostData",
        JSON.stringify(storeCostDataToStore)
      );

      // 저장확인
      const stored = sessionStorage.getItem("storeCostData");
      console.log("세션 스토리지에 저장된 데이터 확인:", stored);

      navigate("/complete");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.whiteBox}>
        <ProgressBar progress={100} />
        <img src={logo} className={styles.logo} alt="logo" />
        <h1 className={styles.subtitle}>
          #우리가게를 <span className={styles.highlight}>소개</span>합니다
        </h1>
        <p className={styles.description}>거의 다 왔어요! 조금만 더 힘내요!</p>
        <p className={styles.keyDescription}>홍보예산을 입력해주세요!</p>
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

        <p className={styles.keyDescription}>#이런_홍보방식을_원해요.</p>
        <div className={styles.buttonGroup}>
          {atmosphere.map((kw) => (
            <SelectButton
              key={kw.id}
              redSelected={selected.includes(kw)}
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

export default StoreCostPage;
