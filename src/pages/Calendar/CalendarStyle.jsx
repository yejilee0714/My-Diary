import styled, { css } from 'styled-components';
import { FiHeart } from 'react-icons/fi';
import '../../style/font.css'

const CalendarContainer = styled.div`
  margin: 0 auto;
  font-family: 'GangwonEdu_OTFBoldA'
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 56px 0 25px;
  padding: 0 20px;
  font-size: 30px;
`;

const MonthControl = styled.div`
  display: flex;
  gap: 10px;
`

const CalendarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const CalendarTitle = styled.h2`
  /* margin: 56px 0 25px; */
  margin: 0;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const CalendarDay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 30px;
  position: relative; /* 날짜에 position: relative; 추가 */

  ${(props) =>
    props.isSaturday &&
    css`
      color: blue;
    `}

  ${(props) =>
    props.isSunday &&
    css`
      color: red;
    `}

  ${(props) =>
    props.isEmpty &&
    css`
      background-color: transparent;
      border: none;
    `}
`;

const HeartIcon = styled(FiHeart)`
  color: #ffffff18;
  fill: #da23ff84;
  position: absolute;
  width: 100%;
  height: 40px;
`;


export { CalendarContainer, CalendarHeader, MonthControl , CalendarButton, CalendarTitle, CalendarGrid , CalendarDay , HeartIcon};