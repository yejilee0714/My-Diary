import React, { useState, useEffect, useRef, useContext } from "react";
import { ProfileInfo, ProfileIntro, ImgUploadBtn, UploadInput, EditForm, Label, Img, ImgIcon, ProfileSettingForm, ProfileTitle, ErrorMsg } from "./JoinInfoStyle";
import { useNavigate } from "react-router-dom";
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
  const uploadInput = useRef(null);

  const { image, setImage, inputImageHandler } = useImage(basicProfileImage);

  const [name, setName] = useState(""),
    [nameValid, setNameValid] = useState(true),
    [nameError, setNameError] = useState("");

  const [accountname, setAccountname] = useState(""),
    [accountnameValid, setAccountnameValid] = useState(true),
    [accountnameError, setAccountnameError] = useState("");

  const [userId, setUserId] = useState("");

  const userID = JSON.parse(localStorage.getItem('userId'));
  const isModify = !!userID;
  const { userInfo, setUserInfo } = useContext(UserInfo);

  const [introduce, setIntroduce] = useState(userInfo?.intro || "");

  useEffect(() => {
    if (!image) {
      setImage(basicProfileImage);
    }
  }, [image, setImage]);

  const modifyUserProfile = () => {
    // Firebase Firestore를 사용하여 프로필 정보 업데이트
    const db = firebase.firestore();
    const userRef = db.collection("users").doc(userID);

    const updatedProfile = {
      userName: name,
      intro: introduce,
      image: image,
    };
  
    if (isModify) {
      userRef
        .update(updatedProfile)
        .then(() => {
          localStorage.setItem('userName', JSON.stringify(updatedProfile.userName));
          localStorage.setItem('intro', JSON.stringify(updatedProfile.intro));
          localStorage.setItem('image', JSON.stringify(updatedProfile.image));
  
          navigate(`/calendar`);
          console.log("프로필 업데이트 성공");
        })
        .catch((error) => {
          console.error("프로필 업데이트 중 오류 발생:", error);
        });
    }
  };

  useEffect(() => {
    if (isModify) {
      try {
        // Firebase Firestore를 사용하여 프로필 정보 가져오기
        const db = firebase.firestore();
        const userRef = db.collection('users').doc(userID);

        userRef.get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
              
            setUserId(data.userId);
            setAccountname(data.accountName);
            setName(data.userName);
            setIntroduce(data.intro);
            setImage(data.image);
          }
        }).catch((error) => {
          console.error("사용자 정보를 불러오는 중 오류 발생:", error);
        });
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류 발생:", error);
      }
    }
  }, [isModify, userId, setImage, userInfo?.uid]);

  // 사용자 유효성 검사
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
    
    const pattern = /^[A-Za-z0-9._]+$/;
    if (accountname && pattern.test(accountname)) {
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

  const handleForm = async (e) => {
    e.preventDefault();
    if (nameValid) {
      if (isModify) {
        modifyUserProfile();
      } 
      else if(accountnameValid) {
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
          <ProfileTitle>{isModify ? "프로필 수정" : "프로필 설정"}</ProfileTitle>
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
          {isModify ? (
              <div className="modifyUserId"> 
                <span>계정 ID</span>
                <p>{accountname}</p>
              </div>
            ) : (
            <>
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
              > 계정 ID <span>( * 계정 변경은 불가합니다. )</span></InputInfo>
              <ErrorMsg>{accountnameError}</ErrorMsg>
            </>
            )
          }
          <InputInfo id="user-introduce" type="text" placeholder="나를 소개하는 글을 작성해주세요." value={introduce} onChange={(e) => setIntroduce(e.target.value)} required>
            소개
          </InputInfo>
        </EditForm>
        {(nameValid && isModify) ? (<AbledBtn contents="프로필 수정하기" type="submit" onClick={handleForm} />) :  (nameValid && accountnameValid && !isModify) ? (
          <AbledBtn contents="월간스토리 시작하기" type="submit" onClick={handleForm} />
        ) : (
          <DisabledBtn contents="월간스토리 시작하기" type="submit" onClick={handleForm} />
        )}

      </ProfileSettingForm>
    </>
  );
}

