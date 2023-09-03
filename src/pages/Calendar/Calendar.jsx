import Navigation from '../../components/Common/Navbar'
import MainHeader from '../../components/Header/MainHeader';
import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, getDay, getDate, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { CalendarContainer, CalendarHeader, MonthControl, CalendarButton, CalendarTitle, CalendarGrid , CalendarDay , HeartIcon } from './CalendarStyle';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  return (
    <>
      <MainHeader />
      <CalendarContainer>
        <CalendarHeader>
          <CalendarTitle>{formattedDate}</CalendarTitle>
          <MonthControl>
            <CalendarButton onClick={goToPreviousMonth}><FiChevronUp /></CalendarButton>
            <CalendarButton onClick={goToNextMonth}><FiChevronDown/></CalendarButton>
          </MonthControl>
        </CalendarHeader>
        <CalendarGrid>
          {weekDays.map((day, index) => (
            <CalendarDay
              key={index}
              isSunday={day === '일'}
              isSaturday={day === '토'}
              className="calendar-day calendar-weekday"
            >
              {day}
            </CalendarDay>
          ))}
          {calendarDays.map((day, index) => (
            <CalendarDay
              key={index}
              isSaturday={index % 7 === 6}
              isSunday={index % 7 === 0}
              isEmpty={day === null}
            >
              {day}
              {isToday(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)) && (
                <HeartIcon />
              )}
            </CalendarDay>
          ))}
        </CalendarGrid>
      </CalendarContainer>
      <Navigation />
    </>
  );
}

export default Calendar;