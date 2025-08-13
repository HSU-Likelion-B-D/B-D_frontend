import React, { useState } from "react";
import styles from "@/styles/pages/FindPWPage.module.scss";
import { logo } from "@/assets";
import Input from "../components/SingupPage/Input";
import Button from "../components/SingupPage/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const FindPWPage = () => {
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

  const [isVerifySent, setIsVerifySent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 이메일 입력값 변경 감지
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setIsValidEmail(validateEmail(email));
  };
  const onSubmit = (data) => {
    console.log("회원가입 데이터:", data);
  };

  const handleClear = (name) => {
    setValue(name, "");
  };

  const handleVerifySend = () => {
    setIsVerifySent(true);
  };

  const isFilled = verificationCode.trim() !== "";
  const allFilled = Object.keys(watch()).every(
    (key) => watch(key)?.trim() !== ""
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.title}>비밀번호를 잊어버리셨나요?</div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formItem}>
            <div className={styles.formItemTitle}>이메일</div>
            <Input
              type="email"
              placeholder="사용하시는 이메일을 입력해주세요."
              className={`${styles.input} ${errors.email ? styles.error : ""}`}
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "올바른 이메일 형식이 아닙니다",
                },
                onChange: handleEmailChange,
              })}
              onClear={() => handleClear("email")}
            />
            {errors.email && (
              <div className={styles.errorMessage}>{errors.email.message}</div>
            )}
          </div>
          <div className={styles.verificationBtnContainer}>
            <Button
              type="button"
              onClick={handleVerifySend}
              disabled={isVerifySent || !isValidEmail}
              className={`${styles.verificationBtn} ${
                isVerifySent || !isValidEmail ? styles.disabledBtn : ""
              }`}
            >
              인증번호 받기
            </Button>
          </div>
          <div className={styles.verifyContainer}>
            <Input
              type="text"
              name="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="인증번호를 입력해주세요."
              className={styles.verifyInput}
              onClear={() => setVerificationCode("")}
            />
            <Button
              type="button"
              className={`${styles.confirmBtn} ${
                isFilled ? styles.activeConfirmBtn : ""
              }`}
            >
              확인
            </Button>
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
              navigate("/new-password");
            }}
          >
            다음
          </Button>
        </form>
      </div>
    </div>
  );
};
