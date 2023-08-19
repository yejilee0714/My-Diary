
import styled from "styled-components";
import {NavLink} from "react-router-dom";

const LoginContainer = styled.div`
  padding: 31px 34px;
`;

const H1 = styled.h1`
  font-family: 'Pretendard-Regular';
  text-align: center;
  font-size: 24px;
  margin: 0px auto 40px;
`;

const LoginForm = styled.form`
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

const LoginWarningMsg = styled.div`
  margin-bottom: 30px;
  font-size: 12px;
  color: var(--warning-color);
`

export {LoginContainer, H1, LoginForm, LinkStyle, LoginWarningMsg};