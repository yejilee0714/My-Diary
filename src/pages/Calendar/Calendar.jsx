import Navigation from '../../components/Common/Navbar';
import MainHeader from '../../components/Header/MainHeader';
import React, { useState, useRef, useEffect  } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, getDay, getDate, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { CalendarContainer, CalendarHeader, MonthControl, CalendarButton, CalendarTitle, CalendarGrid , CalendarDay , CircleIcon , HeartIcon, CalendarContent, DiaryContent, ImagePreview, TodoContent } from './CalendarStyle';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { useImage } from '../../hooks/useImage';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // 일기 정보 가져오는 useState
  const [diaryText, setDiaryText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);

  const db = firebase.firestore();

  const { image, setImage, inputImageHandler } = useImage(null); // useImage 훅 사용

  const today = new Date();
  const diaryId = format(today, 'yyyyMMdd');
  const todoId = format(today, 'yyyyMMdd');
  const userID = JSON.parse(localStorage.getItem('userId'));
  const userDocRef = db.collection('users').doc(userID);
  const diaryDocRef = userDocRef.collection('diaries').doc(diaryId);
  const todoDocRef = userDocRef.collection('todos').doc(todoId);

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // 현재 월의 이름과 년도를 한국어로 포맷팅
  const formattedDate = format(currentDate, 'yyyy년 MMMM', { locale: ko });

  // 요일 배열 (일요일부터 시작)
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // 현재 월의 첫 번째 날짜 계산
  const firstDayOfMonth = startOfMonth(currentDate);

  // 현재 월의 마지막 날짜 계산
  const lastDayOfMonth = endOfMonth(currentDate);

  // 현재 월의 요일 정보
  const firstDayOfWeek = getDay(firstDayOfMonth);
  const lastDayOfWeek = getDay(lastDayOfMonth);

  // 현재 월의 일수
  const daysInMonth = getDate(lastDayOfMonth);

  // 현재 월의 날짜 배열 생성
  const calendarDays = [];

  // 이전 달의 빈 날짜 추가
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // 현재 월의 날짜 추가
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // 다음 달의 빈 날짜 추가
  for (let i = 0; i < 6 - lastDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // 오늘 날짜 확인 함수
  const isToday = (date) => isSameDay(date, new Date());

  // 오늘 날짜의 월, 일, 요일 정보
  const todayMonth = format(new Date(), 'M');
  const todayDay = format(new Date(), 'd');
  const todayWeekday = format(new Date(), 'E', { locale: ko });

  // 날짜 선택하기
  const handleDayClick = (day) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selectedDate); // 선택한 날짜 설정
    const selectedDiaryId = format(selectedDate, 'yyyyMMdd');
    const selectedTodoId = format(selectedDate, 'yyyyMMdd');
  
    // 선택한 날짜의 일기 가져오기
    userDocRef
      .collection('diaries')
      .doc(selectedDiaryId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setDiaryText(data.text || "");
          setImage(data.image || null);
        } else {
          setDiaryText("");
          setImage(null);
        }
      })
      .catch((error) => {
        console.error('일기 데이터를 가져오는 중 오류 발생:', error);
      });
  
    // 선택한 날짜의 할 일 목록 가져오기
    userDocRef
      .collection('todos')
      .doc(selectedTodoId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setTodos(data.text || []);
          setCompletedTasks(data.completedTasks || []);
        } else {
          setTodos([]);
          setCompletedTasks([]);
        }
      })
      .catch((error) => {
        console.error('투두 데이터를 가져오는 중 오류 발생:', error);
      });
  };

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

  useEffect(() => {
    // Firestore에서 해당 일기 문서를 가져와서 todoData 상태에 설정
    todoDocRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setTodos(data.text || "");
        setCompletedTasks(data.completedTasks || []);
      } else {
        console.log('해당 투두 리스트 문서를 찾을 수 없습니다.');
        // If the document doesn't exist, set todos to an empty array or any default value
        setTodos([]);
        setCompletedTasks([]);
      }
    }).catch((error) => {
      console.error('투두 데이터를 가져오는 중 오류 발생:', error);
    });
  }, []);

  const handleTodoCheckboxChange = (index) => {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks[index] = !updatedCompletedTasks[index];
    setCompletedTasks(updatedCompletedTasks);
    
    userDocRef.collection('todos').doc(todoId).update({ completedTasks: updatedCompletedTasks })
    .then(() => {
      console.log('투두 완료 상태가 업데이트되었습니다.');
    })
    .catch((error) => {
      console.error('투두 완료 상태 업데이트 중 오류 발생:', error);
    });
  };
  

  return (
    <>
      <MainHeader />
      <CalendarContainer>
        <CalendarHeader>
          <CalendarTitle>{formattedDate}</CalendarTitle>
          <MonthControl>
            <CalendarButton onClick={goToPreviousMonth} aria-label="이전 달"><FiChevronUp /></CalendarButton>
            <CalendarButton onClick={goToNextMonth} aria-label="다음 달"><FiChevronDown/></CalendarButton>
          </MonthControl>
        </CalendarHeader>
        <CalendarGrid>
          {weekDays.map((day, index) => (
            <CalendarDay
              key={index}
              $isSunday={day === '일'}
              $isSaturday={day === '토'}
              className="calendarDay calendarWeekday"
            >
              {day}
            </CalendarDay>
          ))}
          {calendarDays.map((day, index) => (
            <CalendarDay
              key={index}
              $isSaturday={index % 7 === 6}
              $isSunday={index % 7 === 0}
              $isEmpty={day === null}
              onClick={() => handleDayClick(day)}
            >
              {day}
              {!isToday(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)) && (selectedDate && isSameDay(new Date(currentDate.getFullYear(), currentDate.getMonth(), day), selectedDate) && (<CircleIcon/>))}
              {isToday(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)) && (<HeartIcon/>)}
            </CalendarDay>
          ))}
        </CalendarGrid>
        <CalendarContent>
          <span>
            {selectedDate ? (
              <>
                {format(selectedDate, 'M월 d일 E요일', { locale: ko })}
              </>
            ) : (
              <>
                {todayMonth}월 {todayDay}일 {todayWeekday}요일
              </>
            )}
          </span>
          <DiaryContent>
            <span>오늘의 일기</span>
            <div className="diaryBox textBox">
              <p>{diaryText}</p>
              {image && <ImagePreview src={image} alt="Uploaded" />}
            </div>
          </DiaryContent>
          <TodoContent><span>TODO-LIST</span>
            <div className="todoBox textBox">
              <ul>
                {todos.map((todo, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={completedTasks[index]}
                        onChange={() => handleTodoCheckboxChange(index)}
                      />
                      {todo}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </TodoContent>    
        </CalendarContent>
      </CalendarContainer>
      <Navigation />
    </>
  );
}

export default Calendar;