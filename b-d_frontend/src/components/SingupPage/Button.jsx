import React from "react";

const Button = ({
  type = "button",
  children,
  onClick,
  disabled = false,
  ...props
}) => {
  return (
    <div>
      <button type={type} onClick={onClick} disabled={disabled} {...props}>
        {children}
      </button>
    </div>
  );
};

export default Button;
