import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DisabledBtn, AbledBtn } from '../../components/Common/Button';
import UserInfo from '../../contexts/LoginContext';
import InputInfo from '../../components/Common/InputInfo';
import  {LoginContainer, H1, LoginForm, LinkStyle, LoginWarningMsg} from '../Login/LoginPageStyle'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; // Firestore 추가

export default function LoginPage(){
  const [userEmail, setUserEmail] = useState(""),
    [userPassword, setUserPassword] = useState("");
  const [warningMessage, setWarningMessage] = useState(""), 
    [emailWarning, setEmailWarning] = useState(""),
    [passwordWarning, setPasswordWarning] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserInfo);

  const inputHandler = (e) => {
    if (e.target.type === "email") {
      setUserEmail(e.target.value);
      if (validateEmail(e.target.value)) {
        setEmailWarning("");
      } else {
        setEmailWarning("올바른 이메일 형식이 아닙니다.");
      }
      setWarningMessage("");
    }
    if (e.target.type === "password") {
      setUserPassword(e.target.value);
      if (e.target.value.length < 6) {
        setPasswordWarning("비밀번호는 6자리 이상이어야 합니다.");
      } else {
        setPasswordWarning("");
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
  
    if (!validateEmail(userEmail)) {
      setEmailWarning("올바른 이메일 형식이 아닙니다.");
      return;
    }

    if (userPassword.length < 6) {
      setPasswordWarning("비밀번호는 6자리 이상이어야 합니다.");
      return;
    }

    try {
      // Firestore에서 프로필 정보를 가져와서 일치하는지 확인
      const db = firebase.firestore();
      // const userRef = db.collection("users")
      const querySnapshot = await db.collection('users').where('userEmail', '==', userEmail).get();
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        const userId = querySnapshot.docs[0].id;
        
        // userPassword가 일치하는지 확인
        if (userDoc.userPassword === userPassword) {
          // 비밀번호 일치하면 로그인
          setUserInfo(userDoc);
          localStorage.setItem('userId', JSON.stringify(userId));
          localStorage.setItem('accountName', JSON.stringify(userDoc.accountName));
          localStorage.setItem('image', JSON.stringify(userDoc.image));
          localStorage.setItem('intro', JSON.stringify(userDoc.intro));
          localStorage.setItem('userEmail', JSON.stringify(userDoc.userEmail));
          localStorage.setItem('userName', JSON.stringify(userDoc.userName));
          navigate('/calendar');
        } else {
          setWarningMessage("비밀번호가 일치하지 않습니다.");
        }
      } else {
        setWarningMessage("사용자를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error('Firebase Error:', error);
      setWarningMessage("로그인에 실패하였습니다.");
    }
  };

  return (
    <>
      <LoginContainer>
        <h2 className="a11y-hidden">로그인</h2>
        <H1>로그인</H1>
        <LoginForm onSubmit={submitHandler}>
          <InputInfo type="email" id="user-email" onChange={inputHandler} value={userEmail} warningMsg={emailWarning} placeholder="이메일 주소를 입력해 주세요">
            이메일
          </InputInfo>
          <InputInfo type="password" id="user-password" onChange={inputHandler} value={userPassword} warningMsg={passwordWarning} placeholder="비밀번호를 입력해 주세요">
            비밀번호
            </InputInfo>
          <LoginWarningMsg><p>{warningMessage}</p></LoginWarningMsg>
          {userEmail && userPassword && !emailWarning && !passwordWarning ? (
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

