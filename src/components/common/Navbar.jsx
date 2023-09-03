import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import IconCalendar from "../../assets/icon/calendar-basic-icon.svg"
import IconFillalendar from "../../assets/icon/calendar-select-icon.svg"
import IconDiary from "../../assets/icon/diary-basic-icon.svg"
import IconFillDiary from "../../assets/icon/diary-select-icon.svg"
import IconTodo from "../../assets/icon/todo-basic-icon.svg"
import IconFillTodo from "../../assets/icon/todo-select-icon.svg"
import '../../style/font.css'

export default function Navigation(){
  const location = useLocation();
  const pathname = location.pathname;
  
  const NavLink = ({to, imgSrc, imgAlt, text, fillImgSrc}) => (
    <NavItem to={to} className={`nav-link ${pathname === to ? "active" : ""}`}>
      <img src={pathname === to ? fillImgSrc : imgSrc} alt={imgAlt} width="24px" />
      <StyledNavText style={pathname === to ? {color: `var(--sub-color)`}:{color: `var(--black-color)`}}>{text}</StyledNavText>
    </NavItem>
  );

  return (
    <NavStyle>
      <NavLink to="/calendar" imgSrc={IconCalendar} fillImgSrc={IconFillalendar} imgAlt="캘린더" text="캘린더" />
      <NavLink to="/diary" imgSrc={IconDiary} fillImgSrc={IconFillDiary} imgAlt="일기" text="일기" />
      <NavLink to="/todo-list" imgSrc={IconTodo} fillImgSrc={IconFillTodo} imgAlt="TODO" text="TODO" />
    </NavStyle>
  )
}

const NavStyle = styled.nav`
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  -webkit-box-align: center;
  align-items: center;
  border-top: 1px solid #C0C0C0;
`
const NavItem = styled(Link)`
  width: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 13px auto 8px;

  img{
    width: 32px;
    height: 32px;
  }
`
const StyledNavText = styled.p`
  margin-top: 6px;
  font-size: 0.8rem;
  font-family: 'GangwonEdu_OTFBoldA'
`;