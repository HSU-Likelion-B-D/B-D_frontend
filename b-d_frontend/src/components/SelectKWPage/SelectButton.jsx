import React from "react";
import styles from "../../styles/components/SelectButton.module.scss";
const SelectButton = ({ children, selected, onClick }) => {
  return (
    <div>
      <button
        className={`${styles.button} ${selected ? styles.selected : ""}`}
        onClick={onClick}
        type="button"
      >
        {children}
      </button>
    </div>
  );
};

export default SelectButton;
