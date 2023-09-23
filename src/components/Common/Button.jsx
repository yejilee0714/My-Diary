import styled from 'styled-components';
import '../../style/font.css'
import { Link } from 'react-router-dom';

export function DisabledBtn({ contents, type, onClick }) {
  return <DisabledBtnStyle type={type} onClick={onClick} disabled>{contents}</DisabledBtnStyle>;
}

export function AbledBtn({ contents, type, onClick }){
  return <AbledBtnStyle type={type} onClick={onClick}>{contents}</AbledBtnStyle>;
}

export function BasicBtn({ contents, to}){
  return <BasicBtnStyle to={to}>{contents}</BasicBtnStyle>;
}

const ButtonStyle = styled.button`
  font-family: 'GangwonEdu_OTFBoldA';
  font-weight: 400;
  font-size: 16px;
  width: 100%;
  height: 35px;
  padding-top: 5px;
  text-align: center;
  border-radius: 44px;
`;

const DisabledBtnStyle = styled(ButtonStyle)`
  color: var(--white-color);
  background-color: var(--btn-disabled-color);
  border: none;
  cursor: auto;
`;

const AbledBtnStyle = styled(ButtonStyle)`
  color: var(--white-color);
  background-color: var(--btn-abled-color);
  border: none;
  cursor: pointer;
`;

const BasicBtnStyle = styled(Link)`
  font-family: 'GangwonEdu_OTFBoldA';
  font-weight: 400;
  font-size: 16px;
  width: 100%;
  height: 27px;
  padding-top: 13px;
  text-align: center;
  border-radius: 44px;
  color: var(--black-color);
  background-color: var(--white-color);
  border: 2px solid var(--btn-border-color);  
  cursor: pointer;
`;
