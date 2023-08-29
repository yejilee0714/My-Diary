import React, { useState, useEffect, useRef, useContext } from "react";
import { ProfileInfo, ProfileIntro, ImgUploadBtn, UploadInput, EditForm, Label, Img, ImgIcon, ProfileSettingForm, ProfileTitle, ErrorMsg } from "./JoinInfoStyle";
import { useLocation, useNavigate } from "react-router-dom";
import basicProfileImage from "../../assets/img/profile-main.svg";
import uploadIcon from "../../assets/img/profile-add.svg"
import { DisabledBtn, AbledBtn } from '../../components/Common/Button';

import InputInfo from "../../components/Common/InputInfo";
import fetchApi from "../../utils/fetchApi";
import UserInfo from "../../contexts/LoginContext";
import useDebounce from "../../hooks/useDebounce";
import styled from "styled-components";
import { useImage } from "../../hooks/useImage";

const UserSelectDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export default function ProfileSettings({ email, password }) {
  const navigate = useNavigate();
  const location = useLocation();
  const uploadInput = useRef(null);

  const { image, setImage, inputImageHandler } = useImage(basicProfileImage);

  const [name, setName] = useState(""),
    [nameValid, setNameValid] = useState(false),
    [nameError, setNameError] = useState("");

  const [accountname, setAccountname] = useState(""),
    [accountnameValid, setAccountnameValid] = useState(false),
    [accountnameError, setAccountnameError] = useState("");

  const [prevAccount, setPrevAccount] = useState("");

  const isModify = location.pathname.includes("modify");
  const { userInfo, setUserInfo } = useContext(UserInfo);
  const { output: accountValidResult, setKeyword: setAccountKeyword } = useDebounce(
    "user/accountnamevalid",
    JSON.stringify({
      user: {
        accountname: accountname,
      },
    })
  );
  const [introduce, setIntroduce] = useState("");
  const splitString = "{[split]}";

  const modifyUserProfile = () => {
    const data = {
      user: {
        username: name,
        accountname: accountname,
        intro: introduce,
        image: image,
      },
    };
    fetchApi("user", "PUT", JSON.stringify(data)).then((res) => {
      const accountname = res.user.accountname,
        image = res.user.image,
        username = res.user.username,
        intro = res.user.intro;

      setUserInfo((prev) => {
        return { ...prev, accountname, image, username, intro };
      });
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      navigate(`/profile/${res.user.accountname}`);
    });
  };

  useEffect(() => {
    if (isModify) {
      try {
        fetchApi("user/myinfo", "GET").then((res) => {
          const introduce = res.user.intro.split(splitString)[0];

          setAccountname(res.user.accountname);
          setName(res.user.username);
          setIntroduce(introduce);
          setImage(res.user.image);
          setPrevAccount(res.user.accountname);
        });
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류 발생:", error);
      }
    }
  }, [isModify, setImage]);

  // 사용자 이름 유효성 검사
  const handleNameInput = (event) => {
    const valueName = event.target.value;
    if (valueName.length >= 2 && valueName.length <= 10) {
      setNameError("");
      setNameValid(true);
    } else {
      setNameError("2~10자 이내여야 합니다.");
      setNameValid(false);
    }
    setName(valueName);
  };

  useEffect(() => {
    setAccountKeyword(accountname);
    if (!accountname) {
      setAccountnameValid(false);
      setAccountnameError("");
      return;
    }

    if (prevAccount === accountname) {
      setAccountnameError("");
      setAccountnameValid(true);
      return;
    }
    const pattern = /^[A-Za-z0-9._]+$/;
    if (accountname && pattern.test(accountname)) {
      switch (accountValidResult.message) {
        case "사용 가능한 계정ID 입니다.":
          setAccountnameValid(true);
          setAccountnameError("");
          break;
        default:
          setAccountnameValid(false);
          setAccountnameError(accountValidResult.message);
          break;
      }
    } else {
      setAccountnameValid(false);
      setAccountnameError("영문, 숫자, 특수문자(.),(_)만 사용 가능합니다");
    }
  }, [accountname, setAccountKeyword, accountValidResult, prevAccount]);

  const handleForm = async (e) => {
    e.preventDefault();
    if (nameValid && accountnameValid) {
      const userData = {
        user: {
          email: email,
          password: password,
          image: image,
          username: name,
          accountname: accountname,
          intro: introduce,
        },
      };

      try {
        await fetchApi("user", "POST", JSON.stringify(userData)); // fetch 호출을 fetchApi로 대체합니다.
      } catch (error) {
        console.error("가입 중 오류 발생:", error);
      } // 이미지 업로드 및 회원가입 API 요청
      navigate("/login");
    }
  };

  const imgUploadBtnHandler = () => {
    uploadInput.current.click();
  };

  return (
    <>
      <ProfileSettingForm onSubmit={handleForm}>
        <ProfileIntro>
          <ProfileTitle className={isModify && "a11y-hidden"}>{isModify ? "프로필 수정" : "프로필 설정"}</ProfileTitle>
          {!isModify && <ProfileInfo>나중에 언제든지 변경할 수 있습니다.</ProfileInfo>}
        </ProfileIntro>
        <Label> 
          <ImgUploadBtn type="button" onClick={imgUploadBtnHandler}>
            <Img src={image} alt="uploadFile" />
            <ImgIcon src={uploadIcon} alt="업로드아이콘" />
          </ImgUploadBtn>
        </Label>
        <UploadInput ref={uploadInput} id="profile" type="file" accept=".png, .jpg, .jpeg" onChange={inputImageHandler} hidden />

        <EditForm id="profileForm">
          <InputInfo id="user-name" type="text" minLength={2} maxLength={10} placeholder={"2~10자 이내여야 합니다."} value={name} alertMsg={setNameError} onChange={handleNameInput} onBlur={handleNameInput} required>
            사용자이름
          </InputInfo>
          <ErrorMsg>{nameError}</ErrorMsg>
          <InputInfo
            id="user-id"
            type="text"
            placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
            value={accountname}
            valid={accountnameValid}
            alertMsg={setAccountnameError}
            onChange={(e) => {
              setAccountname(e.target.value);
            }}
            required
          >
            계정 ID
          </InputInfo>
          <ErrorMsg>{accountnameError}</ErrorMsg>
          <InputInfo id="user-introduce" type="text" placeholder="나를 소개하는 글을 작성해주세요." value={introduce} onChange={(e) => setIntroduce(e.target.value)} required>
            소개
          </InputInfo>
        </EditForm>
        {(nameValid && accountnameValid && !isModify) ? (
  <AbledBtn contents="월간스토리 시작하기" type="submit" onClick={handleForm} />
) : (
  <DisabledBtn contents="월간스토리 시작하기" type="submit" onClick={handleForm} />
)}

      </ProfileSettingForm>
    </>
  );
}

