import styled from "styled-components";
import {NavLink} from "react-router-dom";

const JoinContainer = styled.div`
  padding: 31px 34px;

  h1{
    font-family: 'Pretendard-Regular';
    text-align: center;
    font-size: 24px;
    margin: 0px auto 40px;
  }
`;

const SignUpForm = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const LinkStyle = styled(NavLink)`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: var(--gray300-color);
  font-size: 12px;
  font-family: 'Pretendard-Regular';
`;

export {JoinContainer, SignUpForm , LinkStyle};