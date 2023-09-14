import React, { useState, useEffect, useRef, useContext } from "react";
import { ProfileInfo, ProfileIntro, ImgUploadBtn, UploadInput, EditForm, Label, Img, ImgIcon, ProfileSettingForm, ProfileTitle, ErrorMsg } from "./JoinInfoStyle";
import { useLocation, useNavigate } from "react-router-dom";
import basicProfileImage from "../../assets/img/profile-main.svg";
import uploadIcon from "../../assets/img/profile-add.svg"
import { DisabledBtn, AbledBtn } from '../../components/Common/Button';

import InputInfo from "../../components/Common/InputInfo";
import UserInfo from "../../contexts/LoginContext";
import { useImage } from "../../hooks/useImage";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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

  // const [prevAccount, setPrevAccount] = useState("");
  const [username, setUsername] = useState(""); 
  const [intro, setIntro] = useState(""); 
  const [userId, setUserId] = useState("");

  const isModify = location.pathname.includes("modify");
  const { userInfo, setUserInfo } = useContext(UserInfo);

  const [introduce, setIntroduce] = useState("");
  const splitString = "{[split]}";

  const modifyUserProfile = () => {
    // Firebase Firestore를 사용하여 프로필 정보 업데이트
    const db = firebase.firestore();
    const userRef = db.collection("users").doc(userInfo?.uid);

    userRef.set({
      username: name,
      accountname: accountname,
      intro: introduce,
      image: image,
    }, { merge: true })
      .then(() => {
        setUserInfo((prev) => {
          return { ...prev, accountname, image, username: name, intro: introduce };
        });
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        navigate(`/profile/${accountname}`);
      })
      .catch((error) => {
        console.error("프로필 업데이트 중 오류 발생:", error);
      });
  };

  // 사용자 이름 유효성 검사
  useEffect(() => {
    if (isModify) {
      try {
        // Firebase Firestore를 사용하여 프로필 정보 가져오기
        const db = firebase.firestore();
        const userRef = db.collection("users").doc(userInfo?.uid);
  
        userRef.get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            const introduce = data.intro.split(splitString)[0];
  
            setUserId(data.userId);
            setAccountname(data.accountname);
            setUsername(data.username);
            setIntro(introduce);
            setImage(data.image);
            // setPrevAccount(data.accountname);
          }
        }).catch((error) => {
          console.error("사용자 정보를 불러오는 중 오류 발생:", error);
        });
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류 발생:", error);
      }
    }
  }, [isModify, setImage, userInfo?.uid]);

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
    if (!accountname) {
      setAccountnameValid(false);
      setAccountnameError("");
      return;
    }

    // if (prevAccount === accountname) {
    //   setAccountnameError("");
    //   setAccountnameValid(true);
    //   return;
    // }
    
    const pattern = /^[A-Za-z0-9._]+$/;
    if (accountname && pattern.test(accountname)) {
      // switch (accountValidResult.message) {
      //   case "사용 가능한 계정ID 입니다.":
      //     setAccountnameValid(true);
      //     setAccountnameError("");
      //     break;
      //   default:
      //     setAccountnameValid(false);
      //     setAccountnameError(accountValidResult.message);
      //     break;
      // }
      // Firebase Firestore를 사용하여 계정 이름 유효성 검사
      const db = firebase.firestore();
      const usersRef = db.collection("users");
      const query = usersRef.where("accountName", "==", accountname);

      query.get().then((querySnapshot) => {
        if (querySnapshot.empty) {
          setAccountnameValid(true);
          setAccountnameError("");
        } else {
          setAccountnameValid(false);
          setAccountnameError("이미 사용 중인 계정 ID입니다.");
        }
      }).catch((error) => {
        console.error("계정 이름 유효성 검사 중 오류 발생:", error);
      });
    } else {
      setAccountnameValid(false);
      setAccountnameError("영문, 숫자, 특수문자(.),(_)만 사용 가능합니다");
    }
  }, [accountname]);
  // [accountname, prevAccount]);

  const handleForm = async (e) => {
    e.preventDefault();
    if (nameValid && accountnameValid) {
      if (isModify) {
        modifyUserProfile();
      } else {
        // Firebase Firestore를 사용하여 프로필 정보 생성
        const db = firebase.firestore();
        const userRef = db.collection("users").doc(userInfo?.uid);

        userRef.set({
          userId: userRef.id,
          userEmail: email,
          userPassword: password,
          userName: name,
          accountName: accountname,
          intro: introduce,
          image: image,
        })
          .then(() => {
            navigate("/login");
          })
          .catch((error) => {
            console.error("프로필 정보 생성 중 오류 발생:", error);
          });
      }
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

