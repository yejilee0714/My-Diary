import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import moreicon from '../../assets/icon/more.svg'
import Modal from '../Modal/Modal'

export default function MainHeader(){
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const userAccount = localStorage.getItem("accountName")

  useEffect(() => {
    const storedProfileImage = localStorage.getItem('image');
    if (storedProfileImage) {
      setProfileImage(JSON.parse(storedProfileImage));
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImgBtnClick = () => {
    navigate(`/${userAccount}/joinModify`);
  };

  return(
    <>
      <BasicHeaderStyle>
        <ProfileImage>
          <ImgBtn style={{ backgroundImage: `url(${profileImage})`, backgroundSize: 'cover' }} onClick={handleImgBtnClick} />
        </ProfileImage>
        <IconMore >
          <button onClick={openModal}></button>
        </IconMore>
      </BasicHeaderStyle>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </>
  )
}

const BasicHeaderStyle = styled.div`
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  background-color: var(--main-color);
  z-index: 1;
`

const ProfileImage = styled.div`
  width: 80px;
  height: 100%;
  margin: 0;
  position: relative;
  margin-left: 10px;
`;

export const ImgBtn = styled.button`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  border-radius: 50%;
`;

const IconMore = styled.div`
  button {
    width: 100%;
    height: 100%;
    padding: 35px 40px;
    background: url(${moreicon}) center/cover no-repeat;
  }
`
