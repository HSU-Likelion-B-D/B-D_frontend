import React from "react";
import styles from "@/styles/pages/LoginPage.module.scss";
import logo from "../assets/logo.svg";
import { useForm } from "react-hook-form";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  // const onSubmit = async (data) => {
  //   try {
  //     console.log("로그인 데이터:", data);
  //     // TODO: 실제 로그인 API 호출
  //     // const response = await loginAPI(data);
  //     // 로그인 성공 처리
  //   } catch (error) {
  //     console.error("로그인 실패:", error);
  //   }
  // };

  const watchedEmail = watch("email");
  const watchedPassword = watch("password");

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
            <input
              type="email"
              placeholder="이메일을 입력해주세요."
              className={`${styles.input} ${errors.email ? styles.error : ""}`}
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "올바른 이메일 형식이 아닙니다",
                },
              })}
            />
            {errors.email && (
              <div className={styles.errorMessage}>{errors.email.message}</div>
            )}
          </div>
          <div className={styles.formItem}>
            <div className={styles.formItemTitle}>비밀번호</div>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요. (영문, 숫자 포함 8자~12자)"
              className={`${styles.input} ${
                errors.password ? styles.error : ""
              }`}
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 6,
                  message: "비밀번호는 최소 6자 이상이어야 합니다",
                },
              })}
            />
            {errors.password && (
              <div className={styles.errorMessage}>
                {errors.password.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !watchedEmail || !watchedPassword}
            className={styles.submitButton}
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
};
