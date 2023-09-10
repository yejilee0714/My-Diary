import Navigation from '../../components/Common/Navbar'
import MainHeader from '../../components/Header/MainHeader'
import React, { useState, useRef, useEffect  } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, getDay, getDate, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DiaryContainer, H1, TextArea, ImagePreview } from './DiaryStyle';

export default function Diary(){

  // 오늘 날짜의 월, 일, 요일 정보
  const todayMonth = format(new Date(), 'M');
  const todayDay = format(new Date(), 'd');
  const todayWeekday = format(new Date(), 'E', { locale: ko });

  const [textAreaHeight, setTextAreaHeight] = useState('100px'); // 초기 높이 설정
  const [imageFile, setImageFile] = useState(null);
  const imageInputRef = useRef(null);
  // const [diaryEntries, setDiaryEntries] = useState([]);


  // 일기 수정 및 삭제 상태를 관리할 useState
  const [isEditing, setIsEditing] = useState(false);
  const [diaryText, setDiaryText] = useState("당신의 오늘 story가 궁금합니다~");

  // 수정 버튼 클릭 핸들러
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = () => {
    // 추후 추가
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // saveDiary({ text: diaryText, image: imageFile });
    // setDiaryText('');
    // setImageFile(null);
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

  // const saveDiary = ({ text, image }) => {
  //   const newEntry = { text, image };
  //   setDiaryEntries((prevEntries) => [...prevEntries, newEntry]);
  //   setDiaryText('');
  //   setImageFile(null);
  // };

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
                rows={1}
                style={{ height: textAreaHeight }}
                onInput={(e) => {
                  if (isEditing) {
                    const newHeight = `${e.target.scrollHeight}px`;
                    setTextAreaHeight(newHeight);
                  }
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
            <div>
              <p>{diaryText}</p>
              {imageFile && <ImagePreview src={imageFile} alt="Uploaded" />}
            </div>
          )}
          <div className="btnGroup">
            {isEditing ? (
              <>
                <button onClick={handleSaveClick}>저장</button>
                <span> | </span>
                <button onClick={() => setIsEditing(false)}>취소</button>
              </>
            ) : (
              <>
                <button onClick={handleEditClick}>수정</button>
                <span> | </span>
                <button onClick={handleDeleteClick}>삭제</button>
              </>
            )}
          </div>
        </div>
      </DiaryContainer>
      <Navigation />
    </>
  );
}