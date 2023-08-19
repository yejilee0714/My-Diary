import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DisabledBtn, AbledBtn } from '../../components/Common/Button';
import UserInfo from '../../contexts/LoginContext';
import fetchApi from '../../utils/fetchApi';
import InputInfo from '../../components/Common/InputInfo';
import  {LoginContainer, H1, LoginForm, LinkStyle, LoginWarningMsg} from '../Login/LoginPageStyle'

export default function LoginPage(){
  const [userEmail, setUserEmail] = useState(""),
    [userPassword, setUserPassword] = useState("");
  const [warningMessage, setWarningMessage] = useState(""), 
    [emailWarining, setEmailWarining] = useState(""),
    [passwordWarining, setPasswordWarining] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserInfo);

  const inputHandler = (e) => {
    if (e.target.type === "email") {
      setUserEmail(e.target.value);
      if (validateEmail(e.target.value)) {
        setEmailWarining("");
      } else {
        setEmailWarining("올바른 이메일 형식이 아닙니다.");
      }
      setWarningMessage("");
    }
    if (e.target.type === "password") {
      setUserPassword(e.target.value);
      if (e.target.value.length < 6) {
        setPasswordWarining("비밀번호는 6자리 이상이어야 합니다.");
      } else {
        setPasswordWarining("");
      }
      setWarningMessage("");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const json = await fetchApi(
        "user/login",
        "POST",
        JSON.stringify({
          user: {
            email: userEmail,
            password: userPassword,
          },
        })
      );

      if (json.user) {
        setUserInfo(json.user);
        localStorage.setItem("userInfo", JSON.stringify(json.user));
        localStorage.setItem("token", json.user.token);
        navigate("/calendar");
      } else {
        setWarningMessage("* 이메일 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LoginContainer>
        <h2 className="a11y-hidden">로그인</h2>
        <H1>로그인</H1>
        <LoginForm onSubmit={submitHandler}>
          <InputInfo type="email" id="user-email" onChange={inputHandler} value={userEmail} warningMsg={emailWarining} placeholder="이메일 주소를 입력해 주세요">
            이메일
          </InputInfo>
          <InputInfo type="password" id="user-password" onChange={inputHandler} value={userPassword} warningMsg={passwordWarining} placeholder="비밀번호를 입력해 주세요">
            비밀번호
            </InputInfo>
          <LoginWarningMsg><p>{warningMessage}</p></LoginWarningMsg>
          {userEmail && userPassword && !emailWarining && !passwordWarining ? (
            <AbledBtn contents={"로그인"} type={"submit"} />
          ) : (
            <DisabledBtn contents={"로그인"} type={"submit"} />
          )}
        </LoginForm>
        <LinkStyle to={"/join"}>이메일로 회원가입</LinkStyle>
      </LoginContainer>
    </>
  );
}

