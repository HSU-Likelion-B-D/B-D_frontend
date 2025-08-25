import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/FindPWPage.module.scss";
import { logo } from "@/assets";
import Input from "../components/SingupPage/Input";
import Button from "../components/SingupPage/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/apis/axiosInstance";

export default function FindPWPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
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
    if (isValidEmail) {
      setIsVerifySent(true);
      axiosInstance
        .post("/bd/user/sendcode", {
          email: watchedEmail,
          purpose: "PW_CHANGE",
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
            alert("인증 성공");
            // navigate("/new-password");
            setIsVerifySuccess(true);
            setError("verificationCode", {
              type: "success",
              message: "인증번호가 확인되었습니다.",
            });
          }
        })
        .catch((error) => {
          // // API 호출 실패
          // setIsVerifySuccess(false);
          // if (error.response.data.httpStatus === 400) {
          //   setError("verificationCode", {
          //     type: "manual",
          //     message: "인증번호가 일치하지 않습니다.",
          //   });
          // } else {
          //   setError("verificationCode", {
          //     type: "manual",
          //     message: "인증번호가 존재하지 않거나 만료되었습니다.",
          //   });
          // }
          console.error("인증번호 확인 오류:", error);
        });
    }
  };

  const handleNext = () => {
    const email = watchedEmail; // 입력된 이메일 가져오기

    if (!email) {
      console.error("이메일이 없습니다.");
      alert("이메일을 입력해주세요.");
      return;
    }

    sessionStorage.setItem("email", email); // 이메일을 세션 스토리지에 저장
    navigate("/new-password"); // 다음 페이지로 이동
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
              className={`${styles.input} ${
                errors.email ? styles.error : isValidEmail ? styles.valid : ""
              }`}
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
              onClick={handleVerifyConfirm}
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
            onClick={handleNext}
          >
            다음
          </Button>
        </form>
      </div>
    </div>
  );
}
