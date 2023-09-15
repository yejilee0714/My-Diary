import Navigation from '../../components/Common/Navbar'
import MainHeader from '../../components/Header/MainHeader'
import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DiaryContainer, H1, TextArea, ImagePreview, ImageAddBtn } from './DiaryStyle';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { useImage } from '../../hooks/useImage';

export default function Diary(){

  const todayMonth = format(new Date(), 'M');
  const todayDay = format(new Date(), 'd');
  const todayWeekday = format(new Date(), 'E', { locale: ko });

  const [textAreaHeight, setTextAreaHeight] = useState('');
  const imageInputRef = useRef(null);
  const { image, setImage, inputImageHandler } = useImage(null); // useImage 훅 사용

  const initialDiaryData = {
    text: "당신의 오늘 story가 궁금합니다~",
    image: null,
  };

  // 일기 수정 및 삭제 상태를 관리할 useState
  const [isEditing, setIsEditing] = useState(false);
  const [diaryText, setDiaryText] = useState("");
  const [diaryData, setDiaryData] = useState(initialDiaryData);

  const db = firebase.firestore();

  const today = new Date();
  const diaryId = format(today, 'yyyyMMdd');
  const userID = JSON.parse(localStorage.getItem('userId'));
  const userDocRef = db.collection('users').doc(userID);
  const diaryDocRef = userDocRef.collection('diaries').doc(diaryId);
  
  // 컴포넌트가 마운트될 때 Firestore에서 데이터를 가져옴
  useEffect(() => {
    // Firestore에서 해당 일기 문서를 가져와서 diaryData 상태에 설정
    diaryDocRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setDiaryText(data.text || "");
        setImage(data.image || null);
      } else {
        console.log('해당 일기 문서를 찾을 수 없습니다.');
      }
    }).catch((error) => {
      console.error('일기 데이터를 가져오는 중 오류 발생:', error);
    });
  }, []);

  // 저장 버튼 이벤트
  const handleSaveClick = () => {
    setIsEditing(false);

    // 'diaries' 컬렉션에 추가할 일기 데이터 객체 생성
    const diaryData = {
      text: diaryText,
      image: image,
    };

    userDocRef.collection('diaries').doc(diaryId).set(diaryData)
    .then(() => {
      console.log('일기가 성공적으로 저장되었습니다.');
      setImage(image);
    })
    .catch((error) => {
      console.error('일기 저장 중 오류 발생:', error);
    });
  };

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  // 수정 버튼 이벤트
  const handleEditClick = () => {
    setIsEditing(true);

    // 편집 중인 내용을 diaryData로 설정
    setDiaryData({
      text: diaryText,
      image: image,
    });
  };

  // 취소 버튼 이벤트
  const handleCancelClick = () => {
    setDiaryText(diaryData.text);
    setImage(diaryData.image);
    setIsEditing(false);
  };

  // 삭제 버튼 이벤트
  const handleDeleteClick = () => {
    diaryDocRef.delete()
      .then(() => {
        window.location.reload();
    }).catch((error) => {
      console.error('일기 삭제 중 오류 발생:', error);
    });
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
              <ImageAddBtn>
                {image ? (
                  <>
                    <ImagePreview src={image} alt="Uploaded" className="imagePreview" />
                    <div className='imageDelContainer'>
                      <button onClick={() => setImage(null)} className='imageDel'>⨉</button>
                    </div>
                  </>
                ) : (
                  <>
                    <button onClick={handleImageClick} className='imageAdd'><img /></button>
                  </>
                )}
              </ImageAddBtn>
              <input
                type="file"
                accept="image/*"
                onChange={inputImageHandler}
                style={{ display: 'none' }}
                ref={imageInputRef}
              />
              <TextArea
                value={diaryText}
                placeholder='여기에 입력하세요'
                onChange={(e) => setDiaryText(e.target.value)}
                isEditing={isEditing}
                style={{ height: textAreaHeight }}
                onInput={(e) => {
                  const element = e.target;
                  element.style.height = "auto"; // 높이를 자동으로 조절하기 위해 임시로 'auto'로 설정
                  element.style.height = element.scrollHeight + "px"; // 스크롤 높이로 높이를 설정
                }}
              />
            </>
          ) : (
            <>
            {diaryText ? (
              // diaryText에 데이터가 있을 때
              <div>
                {image && <ImagePreview src={image} alt="Uploaded" />}
                <p>{diaryText}</p>
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