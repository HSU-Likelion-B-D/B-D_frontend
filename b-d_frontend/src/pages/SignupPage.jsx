import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { logo } from "@/assets";
import Input from "../components/SingupPage/Input";
import Button from "../components/SingupPage/Button";
import styles from "../styles/pages/SignupPage.module.scss";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/apis/axiosInstance";
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
    placeholder: "비밀번호를 입력해주세요. (영문, 숫자 포함 4자~12자)",
    required: true,
    validation: {
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
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{4,12}$/,
        message: "영문, 숫자, 특수문자 포함 4자~12자",
      },
    },
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "비밀번호를 재입력해주세요. (영문, 숫자 포함 4자~12자)",
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
    formState: { errors, isSubmitting },
    watch,
    setValue,
    setError,
  } = useForm({
    mode: "onChange",
  });

  const [isVerifySent, setIsVerifySent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isVerifySuccess, setIsVerifySuccess] = useState(false);

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 이메일 입력값 변경 감지
  const watchedEmail = watch("email");

  // 이메일 값이 변경될 때마다 유효성 검사
  useEffect(() => {
    if (watchedEmail) {
      setIsValidEmail(validateEmail(watchedEmail));
    } else {
      setIsValidEmail(false);
    }
  }, [watchedEmail]);

  // verificationCode 변경 감지
  const [isFilled, setIsFilled] = useState(false);
  useEffect(() => {
    const filled = verificationCode.trim() !== "";
    setIsFilled(filled);
  }, [verificationCode]);

  const onSubmit = (data) => {
    console.log("onSubmit 실행, 데이터:", data);
    console.log("인증 상태:", { isVerifySuccess, isFilled });

    if (isVerifySuccess && isFilled) {
      // 세션스토리지에 사용자 정보 저장
      const signupDataToStore = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      console.log("세션스토리지에 저장할 데이터:", signupDataToStore);
      sessionStorage.setItem("signupData", JSON.stringify(signupDataToStore));

      // 저장 확인
      const stored = sessionStorage.getItem("signupData");
      console.log("세션스토리지 저장 확인:", stored);

      navigate("/bd-start");
    } else {
      console.log("인증 조건 미충족:", { isVerifySuccess, isFilled });
    }
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
      axiosInstance
        .post("/bd/user/sendcode", {
          email: watchedEmail,
          purpose: "SIGNUP",
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  const handleVerifyConfirm = () => {
    if (isFilled) {
      axiosInstance
        .post("/bd/user/verifycode", {
          email: watchedEmail,
          code: verificationCode,
        })
        .then((res) => {
          if (res.data.isSuccess) {
            // 인증 성공
            setIsVerifySuccess(true);
            setError("verificationCode", {
              type: "success",
              message: "인증번호가 확인되었습니다.",
            });
          }
        })
        .catch((error) => {
          // API 호출 실패
          setIsVerifySuccess(false);
          if (error.response.data.httpStatus === 400) {
            setError("verificationCode", {
              type: "manual",
              message: "인증번호가 일치하지 않습니다.",
            });
          } else {
            setError("verificationCode", {
              type: "manual",
              message: "인증번호가 존재하지 않거나 만료되었습니다.",
            });
          }
          console.error("인증번호 확인 오류:", error);
        });
    }
  };

  // 동의 버튼 눌렀을때
  const allAgreed =
    watch("agree1") === "yes" &&
    watch("agree2") === "yes" &&
    watch("agree3") === "yes";

  const allFilled =
    Object.keys(watch()).every((key) => watch(key)?.trim() !== "") && allAgreed;

  // 디버깅을 위한 콘솔 로그
  useEffect(() => {
    console.log("디버깅 정보:", {
      isSubmitting,
      allFilled,
      isVerifySuccess,
      allAgreed,
      watchedValues: watch(),
      verificationCode,
      isFilled,
    });
  }, [
    isSubmitting,
    allFilled,
    isVerifySuccess,
    allAgreed,
    watch(),
    verificationCode,
    isFilled,
  ]);

  return (
    <div className={styles.container}>
      <img src={logo} className={styles.logo} alt="logo" />
      <p className={styles.subtitle}>
        <span className={styles.highlight}>비디</span>는 당신을 알고 싶어요.
      </p>
      <form className={styles.form}>
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
            disabled={
              isVerifySent || !isValidEmail || !watchedEmail || isVerifySuccess
            }
            className={`${styles.verificationBtn} ${
              isVerifySent || !isValidEmail || !watchedEmail || isVerifySuccess
                ? styles.disabled
                : ""
            }`}
          >
            {isVerifySent ? "인증번호 전송 완료" : "인증번호 받기"}
          </Button>
        </div>
        <div className={styles.verificationContainer}>
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
              onClick={handleVerifyConfirm}
              disabled={!isFilled}
              className={`${styles.confirmBtn} ${
                isFilled ? styles.active : ""
              }`}
            >
              확인
            </Button>
          </div>

          {/* 인증번호 에러/성공 메시지 */}
          {errors.verificationCode && errors.verificationCode.message && (
            <div
              className={`${styles.message} ${
                errors.verificationCode.type === "success"
                  ? styles.successMessage
                  : styles.errorMessage
              }`}
            >
              {errors.verificationCode.message}
            </div>
          )}
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
          type="button"
          disabled={isSubmitting || !allFilled || !isVerifySuccess}
          className={styles.submitButton}
          onClick={() => {
            const formData = watch();
            onSubmit(formData);
          }}
        >
          다음
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
