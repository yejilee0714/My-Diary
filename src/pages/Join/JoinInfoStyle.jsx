import styled from "styled-components";

export const ProfileSettingForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 31px 34px;
`;

export const ProfileIntro = styled.div`
  text-align: center;
  margin: 0px auto 30px;
`

export const ProfileTitle = styled.h1`
  font-family: 'Pretendard-Regular';
  font-size: 24px;
  margin: 0;
`;

export const ProfileInfo = styled.section`
  margin-top: 12px;
  color: var(--gray300-color);
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
  object-fit: cover;
  border-radius: 50%;
`;

export const ImgUploadBtn = styled.button`
  width: 110px;
  height: 110px;
  margin: 0;
  position: relative;
`;

export const ImgIcon = styled.img`
  position: absolute;
  bottom: 0%;
  right: 0%;
`;

export const UploadInput = styled.input`
  
`;

export const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 30px 0px 14px;

  .modifyUserId{
    margin-bottom: 50px;

    label{
      font-size: 0.75rem;
      color: var(--gray400-color);
      font-weight: bold;
    }

    p{
      width: 100%;
      padding-bottom: 9px;
      margin-top: 10px;
      font-size: 14px;
      font-weight: 700;
      border-bottom: 1px solid var(--gray50-color);
    }
  }
`;

export const Label = styled.label`
`;

export const ErrorMsg = styled.p`
  margin-bottom: 2rem;
  margin-top: -1rem;
  font-size: 12px;
  color: var(--warning-color);
`

export const Input = styled.input`
  margin-bottom: 3rem;
  padding-bottom: 0.8rem;
  border: none;
  outline: none;
  font-size: 1.4rem;
  border-bottom: 2px solid var(--line-gray-color);

  &:focus {
    border-color: var(--main-color);
  }

  &::placeholder {
    font-size: 1.4rem;
    color: var(--line-gray-color);
  }
`