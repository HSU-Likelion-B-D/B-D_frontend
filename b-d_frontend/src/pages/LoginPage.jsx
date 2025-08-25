import React, { useState } from "react";
import styles from "@/styles/pages/LoginPage.module.scss";
import { logo, eye, eye_color } from "@/assets";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/apis/axiosInstance";
export default function LoginPage() {
  const [keepLogin, setKeepLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const onSubmit = (data) => {
    console.log(data);
    axiosInstance
      .post("/bd/user/signin", data)
      .then((res) => {
        console.log(res);
        if (res.data.isSuccess) {
          localStorage.setItem("accessToken", res.data.data.token);
          localStorage.setItem("userType", res.data.data.userRoleType);
          localStorage.setItem("nickName", res.data.data.nickname);
          localStorage.setItem("imgUrl", res.data.data.imgUrl);
          if (res.data.data.userRoleType === "BUSINESS") {
            navigate("/");
          } else {
            navigate("/influencer-main");
          }
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const watchedEmail = watch("email");
  const watchedPassword = watch("password");

  const clearEmail = () => {
    setValue("email", "");
  };

  const clearPassword = () => {
    setValue("password", "");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.title}>
          <span>니모</span>가 당신을 기다리고 있었어요!
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formItem}>
            <div className={styles.formItemTitle}>이메일</div>
            <div className={styles.inputContainer}>
              <input
                type="email"
                placeholder="이메일을 입력해주세요."
                className={`${styles.input} ${
                  errors.email
                    ? styles.error
                    : watchedEmail && !errors.email
                    ? styles.valid
                    : ""
                }`}
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "올바른 이메일 형식이 아닙니다",
                  },
                })}
              />
              <button
                type="button"
                className={styles.clearButton}
                onClick={clearEmail}
              >
                ×
              </button>
            </div>
            {errors.email && (
              <div className={styles.errorMessage}>{errors.email.message}</div>
            )}
          </div>
          <div className={styles.formItem}>
            <div className={styles.formItemTitle}>비밀번호</div>
            <div className={styles.inputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요. (영문, 숫자, 특수문자 포함 4자~12자)"
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
                    value: 4,
                    message: "비밀번호는 최소 4자 이상이어야 합니다",
                  },
                  maxLength: {
                    value: 12,
                    message: "비밀번호는 최대 12자까지 입력 가능합니다",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{4,12}$/,
                    message: "영문, 특수문자 포함 4자~12자",
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
                  <img src={eye_color} alt="eye" />
                )}
              </button>
            </div>
            {errors.password && (
              <div className={styles.errorMessage}>
                {errors.password.message}
              </div>
            )}
          </div>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="keepLogin"
              checked={keepLogin}
              onChange={(e) => setKeepLogin(e.target.checked)}
              className={styles.checkboxInput}
            />
            <label htmlFor="keepLogin" className={styles.checkboxLabel}>
              로그인 상태 유지
            </label>
          </div>
          <div className={styles.links}>
            <div
              className={styles.link}
              onClick={() => {
                navigate("/find-password");
              }}
            >
              비밀번호 찾기
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
          <button
            type="submit"
            disabled={isSubmitting || !watchedEmail || !watchedPassword}
            className={styles.submitButton}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
