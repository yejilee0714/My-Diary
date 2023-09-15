import React, { useState } from 'react';
import styled from "styled-components";
import '../../style/font.css'

import { useNavigate } from 'react-router-dom';

export default function Modal({closeModal }){
  const navigate = useNavigate();

  return (
    <ModalStyle>
      <ul >
        <div className='bar'></div>
        <li>
            <button type='button' onClick={(e) => {
              navigate('/profile');
            }}
            > 프로필 수정
            </button>
          </li>
          <li>
            <button type='button' onClick={(e) => {
                navigate('/');
              }}
            > 로그아웃
            </button>
          </li>
          <li>
            <button type='button' onClick={closeModal}> 취소
            </button>
          </li>
        </ul>
      </ModalStyle>
  )
}

const ModalStyle = styled.div`
  background-color: rgba(159, 159, 159, 0.88);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;

  .bar{
    width: 50px;
    height: 4px;
    background-color: var(--gray50-color);
    margin: 20px auto;
  }
  
  ul{
    font-family: 'GangwonEdu_OTFBoldA';
    background: var(--main-color);
    width: 100%;
    display: flex;
    position: fixed;
    flex-direction: column;
    bottom: 0;
    padding-bottom: 20px;
    border-radius: 20px 20px 0 0;
  }
  
  button{
    width: 100%;
    text-align: left;
    padding: 14px 26px;
  }
`
