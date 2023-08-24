import React, { useEffect, useState } from 'react';
import { DisabledBtn, AbledBtn } from '../../components/Common/Button';
import useDebounce from '../../hooks/useDebounce';

import fetchApi from '../../utils/fetchApi';
import InputInfo from '../../components/Common/InputInfo';
import { JoinContainer, JoinForm } from './JoinEmailStyle';

export default function JoinEmailForm({setPage, email, setEmail, password, setPassword}) {
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const {output: emailValidResult, setKeyword: setEmailKeyword} = useDebounce(
    "user/emailvalid",
    JSON.stringify({
      user: {
        email: email,
      },
    })
  );

  useEffect(() => {
    setEmailKeyword(email);

    switch (emailValidResult.message) {
      case "사용 가능한 이메일 입니다.":
        setEmailError("");
        setEmailValid(true);
        break;
      default:
        setEmailError(emailValidResult.message);
        setEmailValid(false);
        break;
    }
  }, [email, setEmailKeyword, emailValidResult]);

  //이메일 주소 기입
  const handleEmailInput = (event) => {
    setEmail(event.target.value);
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

  // 이메일, 비밀번호가 통과되어 유효할 시
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailValid && passwordValid) {
      try {
        const json = await fetchApi(
          "user/register",
          "POST",
          JSON.stringify({
            user: {
              email,
              password,
            },
          })
        );

        if (json.message === "회원가입이 성공했습니다.") {
          setPage("JoinInfo");
        } else {
          setError("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        setError("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  // 기존페이지에서 넘어가도록 지정
  const handleForm = (e) => {
    e.preventDefault();
    setPage("JoinInfo");
    console.log(setPage);
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

