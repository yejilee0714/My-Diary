import styled, { css } from 'styled-components';
import { FiHeart } from 'react-icons/fi';
import '../../style/font.css'

const CalendarContainer = styled.div`
  margin: 122px auto 80px;
  font-family: 'GangwonEdu_OTFBoldA'
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
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
  position: relative;

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
  height: 50px;
  transform: translateY(-10%);
`;

const CalendarContent = styled.div`
  margin: 36px 25px 0;
  span {
    font-size: 1.5rem;
  }

  .textBox {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: var(--white-color);
  border-radius: 15px;
  }
`

const DiaryContent = styled.div`
  margin-top: 23px;
  p{
    font-size: 12px;
    margin: 8px;
    line-height: 17px;
  }
`
  
const TodoContent = styled.div`
  margin-top: 23px;
  p{
    font-size: 12px;
    margin: 8px;
    line-height: 17px;
  }
`


export { CalendarContainer, CalendarHeader, MonthControl , CalendarButton, CalendarTitle, CalendarGrid , CalendarDay , HeartIcon, CalendarContent, DiaryContent, TodoContent};