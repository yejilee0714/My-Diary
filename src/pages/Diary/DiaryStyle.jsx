import styled, { css } from 'styled-components';
import diaryAdd from '../../assets/img/diary-add.svg'
import '../../style/font.css'

const DiaryContainer = styled.div`
  margin: 122px 23px 80px;
  font-family: 'GangwonEdu_OTFBoldA';

  .title{
    font-size: 1.875rem;
  }

  .textBox {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: var(--white-color);
    border-radius: 15px;
    margin-top: 11px;
    
    p{
      margin: 8px;
      line-height: 22px;
    }
    @media screen and (max-width: 390px) {
      p{
        font-size: 12px;
        line-height: 17px;
      }
    }

    .diaryPlaceHolder{
      color: var(--gray300-color);
    }
  }

  .btnGroup {
    text-align: right;
    margin: 8px;
  }
`

const H1 = styled.h1`
  font-size: 2.8125rem;
`

const TextArea = styled.textarea`
  font-family: 'GangwonEdu_OTFBoldA';
  font-size: 1rem;
  width: 95%;
  padding: 8px 5px;
  margin: 5px 10px;
  resize: none;
  overflow-y: hidden;
  height: ${props => props.isEditing ? 'auto' : '100px'};

  ${props => props.isEditing && css`
    height: ${props => props.scrollHeight}px;
  `}
`

const ImagePreview = styled.img`
  width: 268px;
  padding: 10px;
`;

const ImageAddBtn = styled.div`
  width: 268px;
  height: 100%;
  position: relative;
  
  .imageAdd {
    width: 100%;
    height: 100%;
    padding-top: 100%;
    background: url(${diaryAdd}) center/cover no-repeat;
    border-radius: 10px;
    margin: 10px;
  }

  .imageDel{
    position: absolute;
    right: 0px;
    top: 0px;
    margin-top: 20px;
    padding: 5px 5px 0px;
    background: var(--gray100-color);
    border-radius: 50px;
  }

  @media screen and (max-width: 390px) {
    .imageAdd{
      width: 134px;
      height: 113px;
      padding-top: 0%;
    }
  }
`

export { DiaryContainer, H1 , TextArea, ImagePreview, ImageAddBtn };