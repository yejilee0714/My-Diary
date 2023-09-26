import React from "react";
import styled from "styled-components";
import '../../style/font.css'

// props로 submitText : string | onSubmit : 함수 | onCancel : 함수 전달해주시면 됩니다.
export default function AlertModal(props) {
  return (
    <ModalBackDrop>
      <ModalWrapper>
        {props.children}
        <ButtonWrapper>
          <button className="popUpBtn" type="button" onClick={() => props.onCancel()}>취소</button>
          <button className="popUpBtn" type="button" onClick={() => props.onSubmit()}>{props.submitText}</button>
        </ButtonWrapper>
      </ModalWrapper>
    </ModalBackDrop>
  );
}

const ModalBackDrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(159, 159, 159, 0.88);
  z-index: 999;
`;

const ModalWrapper = styled.article`
  font-family: 'GangwonEdu_OTFBoldA';
  position: relative;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--main-color);
  border-radius: 20px;
  width: 252px;
  padding: 30px 0px 68px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  position: absolute;
  border-top: 1px solid var(--gray50-color);
  bottom: 0px;
  align-items: center;
  overflow: hidden;

  .popUpBtn {
    width: 100%;
    font-size: 0.875rem;
    text-align: center;
  }

  button:nth-child(2) {
    height: 100%;
    border-left: 1px solid var(--gray50-color);
    color: var(--warning-color);
  }
`;