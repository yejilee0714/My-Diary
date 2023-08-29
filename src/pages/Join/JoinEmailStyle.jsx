import styled from "styled-components";

const JoinContainer = styled.div`
  padding: 31px 34px;

  h1{
    font-family: 'Pretendard-Regular';
    text-align: center;
    font-size: 24px;
    margin: 0px auto 40px;
  }
`;

const JoinForm = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
`;

export {JoinContainer, JoinForm };