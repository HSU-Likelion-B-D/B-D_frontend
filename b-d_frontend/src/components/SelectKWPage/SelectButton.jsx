import React from "react";
import styles from "../../styles/components/SelectKWPage/SelectButton.module.scss";
const SelectButton = ({ children, selected, onClick, error }) => {
  return (
    <div>
      <button
        className={`${styles.button} ${selected ? styles.selected : ""} ${
          error ? styles.error : ""
        }`}
        onClick={onClick}
        type="button"
      >
        {children}
      </button>
    </div>
  );
};

export default SelectButton;
