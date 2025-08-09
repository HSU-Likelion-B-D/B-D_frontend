import React, { use } from "react";
import Input from "../components/SingupPage/Input";

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
    label: "",
    name: "confirmPassword",
    type: "password",
    placeholder: "비밀번호를 재입력해주세요.",
    required: true,
  },
];

const SignupPage = () => {
  const [form, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="signup-container">
      <img className="logo"></img>
      <p>비디는 당신을 알고 싶어요.</p>
      <form>
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
        </div>

        {passwordFields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
          />
        ))}
        <div>
          <span>비밀번호 찾기</span>
          <span> | </span>
          <span>로그인</span>
        </div>
        <Button type="submit">회원가입</Button>
      </form>
    </div>
  );
};

export default SignupPage;
