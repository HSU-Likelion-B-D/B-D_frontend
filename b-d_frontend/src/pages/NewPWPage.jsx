import React, { useState } from "react";
import styles from "@/styles/pages/NewPWPage.module.scss";
import { logo, eye, eye_color } from "@/assets";
import Button from "../components/SingupPage/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/apis/axiosInstance";

export default function NewPWPage() {
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
    const email = sessionStorage.getItem("email"); // 이전 페이지에서 저장된 이메일 가져오기
    const password = data.password; // 입력된 새 비밀번호 가져오기

    if (!email || !password) {
      console.error("이메일 또는 비밀번호가 없습니다.");
      alert("이메일 또는 비밀번호를 입력해주세요.");
      return;
    }

    axiosInstance
      .post("/bd/user/pwchange", { email, password }) // API 호출
      .then((res) => {
        if (res.data.isSuccess) {
          console.log("비밀번호 변경 성공:", res.data.message);
          alert("비밀번호가 성공적으로 변경되었습니다.");
          navigate("/login"); // 성공 시 로그인 페이지로 이동
        } else {
          console.error("비밀번호 변경 실패:", res.data.message);
          alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
        }
      })
      .catch((error) => {
        const status = error.response?.status;
        const errorMessage =
          error.response?.data?.message || "요청 처리 중 문제가 발생했습니다.";

        if (status === 400) {
          alert("비밀번호 조건이 불일치합니다. 다시 확인해주세요.");
        } else if (status === 404) {
          alert("이메일이 존재하지 않습니다.");
        } else if (status === 500) {
          alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } else {
          alert(errorMessage);
        }
        console.error("비밀번호 변경 오류:", error);
      });
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
                  <img src={eye_color} alt="eye" />
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
          >
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
}
