import React from "react";

const Input = ({
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
