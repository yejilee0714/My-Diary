import React, { useEffect, useState } from 'react';
import { DisabledBtn, AbledBtn } from '../../components/Common/Button';
import InputInfo from '../../components/Common/InputInfo';
import { JoinContainer, JoinForm } from './JoinEmailStyle';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default function JoinEmailForm({setPage, email, setEmail, password, setPassword}) {
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  
  //이메일 주소 기입
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleEmailInput = async (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    if (validateEmail(emailValue)) {
      setEmailError("");
      setEmailValid(true);

      const usersRef = firebase.firestore().collection('users');
      const query = usersRef.where('userEmail', '==', emailValue);

      try {
        const querySnapshot = await query.get();
        if (!querySnapshot.empty) {
          setEmailError("이미 등록된 이메일 주소입니다.");
          setEmailValid(false);
        }
      } catch (error) {
          console.error("Error checking email:", error);
      }
    } else {
      setEmailError("유효한 이메일 주소를 입력하세요.");
      setEmailValid(false);
    }
  };

  // 비밀번호 유효성 검사
  const handlePasswordInput = (event) => {
    const value = event.target.value;
    setPassword(value);
    if (value.length >= 6) {
      setPasswordError("");
      setPasswordValid(true);
    } else {
      setPasswordError("비밀번호는 6자 이상이어야 합니다.");
      setPasswordValid(false);
    }
  };

  // Firebase를 사용한 회원가입 처리
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailValid && passwordValid) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        setPage("JoinInfo"); // 회원가입 성공 시 페이지 이동
      } catch (error) {
        setError("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  // 기존페이지에서 넘어가도록 지정
  const handleForm = (event) => {
    event.preventDefault();
    setPage("JoinInfo");
  };

  return (
    <>
      <JoinContainer>
        <h1>이메일로 회원가입</h1>
        <JoinForm onSubmit={handleSubmit}>
          <InputInfo type="email" id="user-email" onChange={handleEmailInput} value={email} warningMsg={emailError} placeholder="이메일 주소를 입력해 주세요">
            이메일
          </InputInfo>
          <InputInfo type="password" id="user-password" onChange={handlePasswordInput} value={password} warningMsg={passwordError} placeholder="비밀번호를 설정해 주세요">
            비밀번호
            </InputInfo>
        </JoinForm>
        {emailValid && passwordValid ? (
          <AbledBtn contents={"다음"} type={"submit"} onClick={handleForm} />
        ) : (
          <DisabledBtn contents={"다음"} type={"submit"} onClick={handleForm}/>
        )}
      </JoinContainer>
    </>
  );
}

