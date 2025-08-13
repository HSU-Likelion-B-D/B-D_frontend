import React, { useState } from "react";
import ProgressBar from "../components/ProfilePage/ProgressBar";
import styles from "../styles/pages/AddressPage.module.scss";
import logo from "../assets/logo.svg";
import Input from "../components/SingupPage/Input";
const AddressPage = () => {
  const [formData, setFormData] = useState({
    address: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "address") {
      setFormData("");
    }
  };
  const clearAddress = () => {
    setFormData((prevData) => ({
      ...prevData,
      address: "",
    }));
  };
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
            사업장<span>*</span>
          </label>
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
            id="address"
            name="address"
            type="text"
            value={formData.address}
            placeholder="상세 주소"
            showClearButton={false}
            className={styles.detailInput}
          />
        </div>
      </div>
      {/*whiteBox 닫는 div */}
    </div>
  );
};

export default AddressPage;
