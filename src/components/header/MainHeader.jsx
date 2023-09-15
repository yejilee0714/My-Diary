import React, { useState } from 'react';
import styled from 'styled-components'
import { ReactComponent as IconProfile } from '../../assets/img/profile-main.svg'
import moreicon from '../../assets/icon/more.svg'
import Modal from '../Modal/Modal'

export default function MainHeader(){
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return(
    <>
      <BasicHeaderStyle>
        <IconProfile style={{ cursor:'pointer', height: '100%'}}/>
        {/* <IconMore style={{ cursor:'pointer', height: '100%'}}/> */}
        <IconMore >
          <button onClick={openModal}></button>
        </IconMore>
        {/* 모달 */}
      </BasicHeaderStyle>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </>
  )
}

const BasicHeaderStyle = styled.div`
  width: 100%;
  height: 66px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  background-color: var(--main-color);
  z-index: 1;
`

const IconMore = styled.div`
  button {
    width: 100%;
    height: 100%;
    padding: 35px 40px;
    background: url(${moreicon}) center/cover no-repeat;
  }
`
