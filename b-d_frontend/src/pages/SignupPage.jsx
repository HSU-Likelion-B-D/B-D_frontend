import React, { use } from "react";
import logo from "../assets/logo.svg";
import Input from "../components/SingupPage/Input";
import Button from "../components/SingupPage/Button";
import { useState } from "react";
import styles from "../styles/SignupPage/SignupPage.module.scss";
const inputFields = [
  {
    label: "이름 / 성함",
    name: "name",
    type: "text",
    placeholder: "당신을 어떤식으로 불러드릴까요?",
    required: true,
  },
  {
    label: "이메일",
    name: "email",
    type: "email",
    placeholder: "이메일 주소를 입력해주세요",
    required: true,
  },
];

const passwordFields = [
  {
    label: "비밀번호",
    name: "password",
    type: "password",
    placeholder: "비밀번호를 입력해주세요.",
    required: true,
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "비밀번호를 재입력해주세요.",
    required: true,
  },
];

const SignupPage = () => {
  // 인증번호 전송 상태 관리
  const [isVerifySent, setIsVerifySent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  // 인증번호 입력 필드 상태 관리
  // 인증번호 입력 필드가 채워졌는지 확인
  const isFilled = verificationCode.trim() !== "";

  // name을 기준으로 폼 상태 관리
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // 모든 input이 채워졌는지 확인 -> 회원가입 버튼에서 사용
  const allFilled = Object.values(form).every((v) => v && v.trim() !== "");

  // 모든 input의 onChange handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // x버튼 클릭시 해당 input의 value를 초기화하는 함수
  // name을 인자로 받아서 해당 input의 value를 ""로 설정
  const handleClear = (name) => {
    setForm((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // 인증번호 받기 버튼 클릭시 호출되는 함수
  const handleVerifySend = () => {
    setIsVerifySent(true);
  };

  return (
    <div className={styles.container}>
      <img src={logo} className={styles.logo}></img>
      <p className={styles.subtitle}>
        <span className={styles.highlight}>비디</span>는 당신을 알고 싶어요.
      </p>
      <form className={styles.form}>
        {/*이름,이메일 입력 필드*/}
        {inputFields.map((field) => (
          <div key={field.name}>
            <label>
              {field.label}
              {field.required && <span style={{ color: "red" }}>*</span>}
            </label>

            <Input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              className={styles.input}
              onClear={handleClear}
            />
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
            value={form.verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="인증번호를 입력해주세요."
            className={styles.input}
            onClear={handleClear}
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
        {/*비밀번호 입력 필드*/}
        {passwordFields.map((field) => (
          <Input
            key={field.name}
            label={field.label ? field.label : undefined}
            type={field.type}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            className={styles.input}
            onClear={handleClear}
          />
        ))}

        <div className={styles.signupLink}>
          <span className={styles.findPwd}>비밀번호 찾기</span>
          <span className={styles.divider}> | </span>
          <span className={styles.loginLink}>로그인</span>
        </div>
        <Button
          type="submit"
          className={`${styles.submitBtn} ${
            allFilled ? styles.activeSubmitBtn : ""
          }`}
          disabled={!allFilled}
        >
          회원가입
        </Button>
      </form>
    </div>
  );
};

export default SignupPage;
