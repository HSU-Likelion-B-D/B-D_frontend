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
      <img src={logo} className={styles.logo} alt="logo" />
      <p className={styles.subtitle}>
        <span className={styles.highlight}>비디</span>는 당신을 알고 싶어요.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {inputFields.map((field) => (
          <div key={field.name} className={styles.formItem}>
            <label>
              {field.label}
              <span style={{ color: "red" }}>*</span>
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

        <Button
          type="button"
          onClick={handleVerifySend}
          disabled={isVerifySent}
          className={`${styles.verificationBtn} ${
            isVerifySent ? styles.disabledBtn : ""
          }`}
        >
          인증번호 받기
        </Button>
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
          <Button
            type="button"
            className={`${styles.confirmBtn} ${
              isFilled ? styles.activeConfirmBtn : ""
            }`}
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
        <div className={styles.signupLink}>
          <span
            className={styles.findPwd}
            onClick={() => {
              navigate("/find-password");
            }}
          >
            비밀번호 찾기
          </span>
          <span className={styles.divider}> | </span>
          <span
            className={styles.loginLink}
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </span>
        </div>

        <Button
          type="submit"
          className={`${styles.submitBtn} ${
            allFilled ? styles.activeSubmitBtn : ""
          }`}
          disabled={isSubmitting || !allFilled}
        >
          {isSubmitting ? "회원가입 중..." : "회원가입"}
        </Button>
      </form>
    </div>
  );
};

export default SignupPage;
