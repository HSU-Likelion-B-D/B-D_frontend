import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { logo } from "@/assets";
import Input from "../components/SingupPage/Input";
import Button from "../components/SingupPage/Button";
import styles from "../styles/pages/SignupPage.module.scss";
import { useNavigate } from "react-router-dom";

const inputFields = [
  {
    label: "이름 / 성함",
    name: "name",
    type: "text",
    placeholder: "당신을 어떤식으로 불러드릴까요?",
    validation: { required: "이름을 입력해주세요" },
  },
  {
    label: "이메일",
    name: "email",
    type: "email",
    placeholder: "이메일 주소를 입력해주세요",
    validation: {
      required: "이메일을 입력해주세요",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "올바른 이메일 형식이 아닙니다",
      },
    },
  },
];

const passwordFields = [
  {
    label: "비밀번호",
    name: "password",
    type: "password",
    placeholder: "비밀번호를 입력해주세요.",
    required: true,
    validation: {
      required: "비밀번호를 입력해주세요",
      minLength: {
        value: 6,
        message: "비밀번호는 최소 6자 이상이어야 합니다",
      },
    },
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "비밀번호를 재입력해주세요.",
    required: false,
    validation: {
      required: "비밀번호를 다시 입력해주세요",
      validate: (value, { password }) =>
        value === password || "비밀번호가 일치하지 않습니다",
    },
  },
];

const SignupPage = () => {
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
  const watchedEmail = watch("email");

  // 이메일 값이 변경될 때마다 유효성 검사
  React.useEffect(() => {
    if (watchedEmail) {
      setIsValidEmail(validateEmail(watchedEmail));
    } else {
      setIsValidEmail(false);
    }
  }, [watchedEmail]);

  // verificationCode 변경 감지
  const [isFilled, setIsFilled] = useState(false);

  React.useEffect(() => {
    const filled = verificationCode.trim() !== "";
    setIsFilled(filled);
  }, [verificationCode]);

  const onSubmit = (data) => {
    navigate("/start");
    console.log("회원가입 데이터:", data);
  };

  const handleClear = (name) => {
    setValue(name, "");
    // 이메일을 지울 때 유효성 상태도 초기화
    if (name === "email") {
      setIsValidEmail(false);
    }
  };

  const handleVerifySend = () => {
    if (isValidEmail) {
      setIsVerifySent(true);
      // TODO: 실제 인증번호 전송 API 호출
      console.log("인증번호 전송:", watchedEmail);
    }
  };

  const handleVerifyConfirm = () => {
    if (isFilled) {
      // TODO: 실제 인증번호 확인 API 호출
      // 인증 성공 시 처리 로직
    }
  };

  // 동의 버튼 눌렀을때
  const allAgreed =
    watch("agree1") === "yes" &&
    watch("agree2") === "yes" &&
    watch("agree3") === "yes";

  const allFilled =
    Object.keys(watch()).every((key) => watch(key)?.trim() !== "") && allAgreed;

  return (
    <div className={styles.container}>
      <img src={logo} className={styles.logo} alt="logo" />
      <p className={styles.subtitle}>
        <span className={styles.highlight}>비디</span>는 당신을 알고 싶어요.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {inputFields.map((field) => (
          <div key={field.name} className={styles.formItem}>
            <label>
              {field.label}
              <span style={{ color: "#FF0000" }}>*</span>
            </label>
            <Input
              type={field.type}
              placeholder={field.placeholder}
              className={`${styles.input} ${
                errors[field.name] ? styles.error : ""
              }`}
              {...register(field.name, field.validation)}
              onClear={() => handleClear(field.name)}
            />
            {errors[field.name] && (
              <div className={styles.errorMessage}>
                {errors[field.name].message}
              </div>
            )}
          </div>
        ))}

        <div className={styles.verificationBtnContainer}>
          <Button
            type="button"
            onClick={handleVerifySend}
            disabled={isVerifySent || !isValidEmail || !watchedEmail}
            className={`${styles.verificationBtn} ${
              isVerifySent || !isValidEmail || !watchedEmail
                ? styles.disabled
                : ""
            }`}
          >
            {isVerifySent ? "인증번호 전송 완료" : "인증번호 받기"}
          </Button>
        </div>

        <div className={styles.verifyContainer}>
          <Input
            type="text"
            name="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="인증번호를 입력해주세요."
            className={styles.input}
            onClear={() => setVerificationCode("")}
          />
          {errors.verificationCode && (
            <div className={styles.errorMessage}>
              {errors.verificationCode.message}
            </div>
          )}
          <Button
            type="button"
            onClick={handleVerifyConfirm}
            disabled={!isFilled}
            className={`${styles.confirmBtn} ${isFilled ? styles.active : ""}`}
          >
            확인
          </Button>
        </div>

        {passwordFields.map((field) => (
          <div key={field.name} className={styles.formItem}>
            {field.name === "password" && field.label && (
              <label>
                {field.label}
                {field.required && <span style={{ color: "red" }}>*</span>}
              </label>
            )}
            <Input
              type={field.type}
              placeholder={field.placeholder}
              className={`${styles.input} ${
                errors[field.name] ? styles.error : ""
              }`}
              {...register(field.name, field.validation)}
              onClear={() => handleClear(field.name)}
            />
            {errors[field.name] && (
              <div className={styles.errorMessage}>
                {errors[field.name].message}
              </div>
            )}
          </div>
        ))}

        <div className={styles.agreeSection}>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="agree1"
              checked={watch("agree1") === "yes"}
              onChange={(e) =>
                setValue("agree1", e.target.checked ? "yes" : "no")
              }
              className={styles.checkboxInput}
            />
            <label htmlFor="agree1" className={styles.checkboxLabel}>
              개인정보 수집 및 이용 동의
            </label>
          </div>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="agree2"
              checked={watch("agree2") === "yes"}
              onChange={(e) =>
                setValue("agree2", e.target.checked ? "yes" : "no")
              }
              className={styles.checkboxInput}
            />
            <label htmlFor="agree2" className={styles.checkboxLabel}>
              위치 정보 수집 동의
            </label>
          </div>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="agree3"
              checked={watch("agree3") === "yes"}
              onChange={(e) =>
                setValue("agree3", e.target.checked ? "yes" : "no")
              }
              className={styles.checkboxInput}
            />
            <label htmlFor="agree3" className={styles.checkboxLabel}>
              제 3자 정보 제공 동의(광고주와 매칭 위해 필요)
            </label>
          </div>
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
              navigate("/login");
            }}
          >
            로그인
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !allFilled}
          className={styles.submitButton}
          onClick={handleSubmit(onSubmit)}
        >
          다음
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
