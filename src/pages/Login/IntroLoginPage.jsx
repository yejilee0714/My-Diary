import React, { useState, useEffect, useContext } from "react";
import UserInfo from "../../contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import { BasicBtn } from "../../components/Common/Button";

import SplashPage from "../Splash/SplashPage";
import bunny from "../../assets/img/bunny.svg"
import { StyledLoginPopUpPage, LogoImageWrap, LoginPopUpWrap } from "./IntroLoginPageStyle";

function LoginPopUpPage(){
  return(
    <StyledLoginPopUpPage >
      <LogoImageWrap>
        <img src={bunny} alt="mainLogo" className="main-logo" />
      </LogoImageWrap>
      <LoginPopUpWrap>
        <BasicBtn to={"login"} contents={'이메일로 로그인'}/>
        <BasicBtn to={"join"} contents={'회원가입'}/>
      </LoginPopUpWrap>
    </StyledLoginPopUpPage>
  )
}

const IntroLoginPage = () => {
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(UserInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      setTimeout(() => {
        setLoading(false);
      }, 8000);
    }
  }, []);

  useEffect(() => {
    if (userInfo && localStorage.getItem("token")) {
      // 로그인된 사용자인 경우 홈으로 이동
      navigate("/calendar");
    }
  }, [userInfo, navigate]);

  return loading ? <SplashPage /> : <LoginPopUpPage />;
};

export default IntroLoginPage;