import React from "react";
import styles from "../../styles/components/StoreCostPage/SelectButton.module.scss";
const SelectButton = ({ children, selected, onClick, error, redSelected }) => {
  return (
    <div>
      <button
        className={`${styles.button} ${selected ? styles.selected : ""} ${
          redSelected ? styles.redSelected : ""
        }${error ? styles.error : ""} `}
        onClick={onClick}
        type="button"
      >
        {children}
      </button>
    </div>
  );
};

export default SelectButton;
