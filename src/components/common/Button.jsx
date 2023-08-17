import styled from 'styled-components';
import '../../style/font.css'

export function DisabledBtn({ contents }) {
  return <DisabledBtnStyle disabled>{contents}</DisabledBtnStyle>;
}

export function AbledBtn({ contents, handleFunc }){
  return <AbledBtnStyle onClick = {handleFunc}>{contents}</AbledBtnStyle>;
}

export function BasicBtn({ contents, handleFunc }){
  return <BasicBtnStyle onClick = {handleFunc}>{contents}</BasicBtnStyle>;
}

const ButtonStyle = styled.button`
  font-family: 'GangwonEdu_OTFBoldA';
  font-weight: 400;
  font-size: 16px;
  width: 322px;
  height: 44px;
  text-align: center;
  border-radius: 44px;
`;

const DisabledBtnStyle = styled(ButtonStyle)`
  color: var(--white-color);
  background-color: var(--btn-disabled-color);
  border: none;
`;

const AbledBtnStyle = styled(ButtonStyle)`
  color: var(--white-color);
  background-color: var(--btn-abled-color);
  border: none;
  cursor: pointer;
`;

const BasicBtnStyle = styled(ButtonStyle)`
  color: var(--black-color);
  background-color: var(--white-color);
  border: 2px solid var(--btn-border-color);  
  cursor: pointer;
`;
