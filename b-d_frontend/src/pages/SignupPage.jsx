import React, { use } from "react";
import Input from "../components/SingupPage/Input";
import Button from "../components/SingupPage/Button";
import { useState } from "react";
import styles from "@/styles/SignupPage/SignupPage.module.scss";
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
  // name을 기준으로 폼 상태 관리
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // 모든 input의 onChange handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.signup - container}>
      <img className={styles.logo}></img>
      <p className={styles.signup - subtitle}>
        <span className={styles.signup - highlight}>비디</span>는 당신을 알고
        싶어요.
      </p>
      <form className={styles.signup - form}>
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
              className={styles.signup - input}
            />
          </div>
        ))}
        <Button type="button">인증번호 받기</Button>
        <div>
          <Input
            type="text"
            name="verificationCode"
            value={form.verificationCode}
            onChange={handleChange}
            placeholder="인증번호를 입력해주세요."
          />
          <Button type="button" className={styles.verification - button}>
            인증번호 확인
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
            className={styles.signup - input}
          />
        ))}

        <div className={styles.signup - links}>
          <span className={styles.find - password}>비밀번호 찾기</span>
          <span className={styles.divider}> | </span>
          <span className={styles.login - link}>로그인</span>
        </div>
        <Button type="submit" className={styles.signup - submit - btn}>
          회원가입
        </Button>
      </form>
    </div>
  );
};

export default SignupPage;
