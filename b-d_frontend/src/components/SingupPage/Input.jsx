import React from "react";
import styles from "../../styles/components/Input.module.scss";
const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  onClear,
  showClearButton = true,
  ...props
}) => {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <p>
          {label}
          {required && <span style={{ color: "red" }}>*</span>}
        </p>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{ paddingRight: "48px" }}
        {...props}
      />

      {showClearButton && (
        <button
          type="button"
          onClick={() => onClear && onClear(name)}
          className={styles.xButton}
          tabIndex={-1}
        >
          x
        </button>
      )}

    </div>
  );
};

export default Input;
