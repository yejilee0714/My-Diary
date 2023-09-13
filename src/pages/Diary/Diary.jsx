import Navigation from '../../components/Common/Navbar'
import MainHeader from '../../components/Header/MainHeader'
import React, { useState, useRef, useEffect, useContext  } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, getDay, getDate, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DiaryContainer, H1, TextArea, ImagePreview } from './DiaryStyle';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default function Diary(){

  // 오늘 날짜의 월, 일, 요일 정보
  const todayMonth = format(new Date(), 'M');
  const todayDay = format(new Date(), 'd');
  const todayWeekday = format(new Date(), 'E', { locale: ko });

  const [textAreaHeight, setTextAreaHeight] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const imageInputRef = useRef(null);
  const [userId, setUserId] = useState("");
  // const [diaryEntries, setDiaryEntries] = useState([]);

  const initialDiaryData = {
    text: "당신의 오늘 story가 궁금합니다~",
    image: null,
  };

  // 일기 수정 및 삭제 상태를 관리할 useState
  const [isEditing, setIsEditing] = useState(false);
  const [diaryText, setDiaryText] = useState("");
  const [diaryData, setDiaryData] = useState(initialDiaryData);

  // Firebase Firestore 인스턴스 생성
  const db = firebase.firestore();

  // 컴포넌트가 마운트될 때 Firestore에서 데이터를 가져옴
  useEffect(() => {
  const today = new Date();
  const diaryId = format(today, 'yyyyMMdd');
  const userID = JSON.parse(localStorage.getItem('userId'));

  const userDocRef = db.collection('users').doc(userID);
  const diaryDocRef = userDocRef.collection('diaries').doc(diaryId);

  // Firestore에서 해당 일기 문서를 가져와서 diaryData 상태에 설정
  diaryDocRef.get().then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      setDiaryText(data.text || ""); // text 상태 설정
      setImageFile(data.image || null); // image 상태 설정
    } else {
      console.log('해당 일기 문서를 찾을 수 없습니다.');
    }
  }).catch((error) => {
    console.error('일기 데이터를 가져오는 중 오류 발생:', error);
  });
}, []);


  // 수정 버튼 클릭 핸들러
  const handleEditClick = () => {
    setIsEditing(true);

    // 편집 중인 내용을 diaryData로 설정
    setDiaryData({
      text: diaryText,
      image: imageFile,
    });
  };

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = () => {
    // 오늘 날짜를 기반으로 ID를 생성
    const today = new Date();
    const diaryId = format(today, 'yyyyMMdd'); 

    const userID = JSON.parse(localStorage.getItem('userId'));

    // 'diaries' 컬렉션에서 해당 일기 문서를 삭제
    const userDocRef = db.collection('users').doc(userID);
    const diaryDocRef = userDocRef.collection('diaries').doc(diaryId);

    diaryDocRef.delete()
      .then(() => {
        console.log('일기가 성공적으로 삭제되었습니다.', diaryId);
      // 삭제 후에 필요한 작업을 수행할 수 있습니다.
    }).catch((error) => {
      console.error('일기 삭제 중 오류 발생:', error);
    });
  };

  const handleSaveClick = () => {
    setIsEditing(false);

    const today = new Date();
    const diaryId = format(today, 'yyyyMMdd'); 

     // userId 정보 가져오기
    const userID = JSON.parse(localStorage.getItem('userId'));

    // Firestore에 액세스하고 'users' 컬렉션에서 userId에 해당하는 문서를 가져옵니다.
    const userDocRef = db.collection('users').doc(userID);

    // 'diaries' 컬렉션에 추가할 일기 데이터 객체 생성
    const diaryData = {
      text: diaryText,
      image: imageFile,
      // 다른 필요한 데이터도 추가할 수 있습니다.
    };

    userDocRef.collection('diaries').doc(diaryId).set(diaryData)
    .then(() => {
      console.log('일기가 성공적으로 저장되었습니다.', diaryId);
    })
    .catch((error) => {
      console.error('일기 저장 중 오류 발생:', error);
    });
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file));
    }
  };

  // 이미지 추가 버튼 클릭 핸들러
  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleCancelClick = () => {
    setDiaryText(diaryData.text);
    setImageFile(diaryData.image);
    setIsEditing(false);
  };

  return (
    <>
      <MainHeader />
      <DiaryContainer>
        <H1>
          {todayMonth}월 {todayDay}일 {todayWeekday}요일
        </H1>
        <span className="title">오늘의 일기</span>
        <div className="textBox">
          {isEditing ? (
            <>
              <TextArea
                value={diaryText}
                onChange={(e) => setDiaryText(e.target.value)}
                isEditing={isEditing}
                style={{ height: textAreaHeight }}
                onInput={(e) => {
                  const element = e.target;
                  element.style.height = "auto"; // 높이를 자동으로 조절하기 위해 임시로 'auto'로 설정
                  element.style.height = element.scrollHeight + "px"; // 스크롤 높이로 높이를 설정
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                ref={imageInputRef}
              />
              <button onClick={handleImageClick}>이미지 추가</button>
              {imageFile && <ImagePreview src={imageFile} alt="Uploaded" />}
            </>
          ) : (
            <>
            {diaryText ? (
              // diaryText에 데이터가 있을 때
              <div>
                <p>{diaryText}</p>
                {imageFile && <ImagePreview src={imageFile} alt="Uploaded" />}
              </div>
            ) : (
              // diaryText에 데이터가 없을 때
              <div>
                <p className = "diaryPlaceHolder">당신의 오늘 story가 궁금합니다~</p>
              </div>
            )}
          </>
          )}
          <div className="btnGroup">
            {isEditing ? (
              <>
                <button onClick={handleSaveClick}>저장</button>
                <span> | </span>
                <button onClick={handleCancelClick}>취소</button>
              </>
            ) : (
              <>
              { diaryText ? (
                <>
                  <button onClick={handleEditClick}>수정</button>
                  <span> | </span>
                  <button onClick={handleDeleteClick}>삭제</button>
                </>
                ) : (
                  <button onClick={handleEditClick}>일기 작성하기</button>
                )
              }
              </>
            )}
          </div>
        </div>
      </DiaryContainer>
      <Navigation />
    </>
  );
}