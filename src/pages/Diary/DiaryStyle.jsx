import styled, { css } from 'styled-components';
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
  padding: 8px;
  margin-top: 8px;
  resize: none;
  overflow-y: hidden;
  height: ${props => props.isEditing ? 'auto' : '100px'};

  ${props => props.isEditing && css`
    height: ${props => props.scrollHeight}px;
  `}
`

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-top: 10px;
`;

export { DiaryContainer, H1 , TextArea, ImagePreview };