import React, { useState } from "react";
import styles from "@/styles/pages/NewPWPage.module.scss";
import logo from "../assets/logo.svg";
import Button from "../components/SingupPage/Button";
import eye from "../assets/eye.svg";
import eyeColor from "../assets/eye-color.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const NewPWPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
  });
  const [showPassword, setShowPassword] = useState(false);
  const watchedPassword = watch("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const watchedConfirmPassword = watch("confirmPassword");

  const onSubmit = (data) => {
    console.log("회원가입 데이터:", data);
  };

  const clearPassword = () => {
    setValue("password", "");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const allFilled = Object.keys(watch()).every(
    (key) => watch(key)?.trim() !== ""
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.title}>새 비밀번호를 입력해주세요.</div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formItem}>
            <div className={styles.formItemTitle}>새 비밀번호</div>
            <div className={styles.inputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요. (영문, 숫자 포함 8자~12자)"
                className={`${styles.input} ${
                  errors.password
                    ? styles.error
                    : watchedPassword && !errors.password
                    ? styles.valid
                    : ""
                }`}
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 최소 8자 이상이어야 합니다",
                  },
                })}
              />
              <button
                type="button"
                className={styles.clearButton}
                onClick={clearPassword}
              >
                ×
              </button>
              <button
                type="button"
                className={styles.passwordToggleButton}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <img src={eye} alt="eye" />
                ) : (
                  <img src={eyeColor} alt="eye" />
                )}
              </button>
            </div>
            {errors.password && (
              <div className={styles.errorMessage}>
                {errors.password.message}
              </div>
            )}
          </div>
          <div className={styles.formItem}>
            <div className={styles.formItemTitle}>비밀번호 확인</div>
            <div className={styles.inputContainer}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="동일한 비밀번호를 입력해주세요."
                className={`${styles.input} ${
                  errors.confirmPassword
                    ? styles.error
                    : watchedConfirmPassword && !errors.confirmPassword
                    ? styles.valid
                    : ""
                }`}
                {...register("confirmPassword", {
                  required: "비밀번호를 입력해주세요",
                  validate: (value) => {
                    if (value !== watch("password")) {
                      return "비밀번호가 일치하지 않습니다";
                    }
                    return true;
                  },
                })}
              />
              <button
                type="button"
                className={styles.clearButton}
                onClick={clearPassword}
              >
                ×
              </button>
              <button
                type="button"
                className={styles.passwordToggleButton}
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <img src={eye} alt="eye" />
                ) : (
                  <img src={eyeColor} alt="eye" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <div className={styles.errorMessage}>
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
          <div className={styles.links}>
            <div
              className={styles.link}
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </div>
            |
            <div
              className={styles.link}
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입
            </div>
          </div>
          <Button
            type="submit"
            className={`${styles.submitBtn} ${
              allFilled ? styles.activeSubmitBtn : ""
            }`}
            disabled={isSubmitting || !allFilled}
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
};
