import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  ...props
}) => {
  return (
    <div>
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
        {...props}
      />
    </div>
  );
};

export default Input;
