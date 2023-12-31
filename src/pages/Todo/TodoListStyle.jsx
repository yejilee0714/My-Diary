import styled from 'styled-components';
import '../../style/font.css'

const TodoContainer = styled.div`
  margin: 122px 23px 80px;
  font-family: 'GangwonEdu_OTFBoldA';

  .title{
    font-size: 1.875rem;
  }

  .todoBox{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    background-color: var(--white-color);
    border-radius: 15px;
    margin-top: 11px;
  }

  .btnGroup {
    text-align: right;
    margin: 8px;
    font-size: 0.875rem;
  }
`

const H1 = styled.h1`
  font-size: 2.8125rem;
`
const TodoBox = styled.div`
  background-color: var(--white-color);
  border-radius: 15px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    outline: none;
    margin-left: 15px;
    padding-left: 5px;
    border-bottom: 1px solid #ccc;
    font-size: 1rem;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px 5px;
    margin-right: 15px;
    cursor: pointer;
    border-radius: 0px 50px 50px 0px;
  }

  .todoPlaceHolder{
    color: var(--gray300-color);
    margin: 8px;
    line-height: 22px;
  }

  .inputText{
    margin: 10px 0 0 15px;
  }

  .inputBtn{
    margin: 10px 15px 0 0;
  }
`

const ListContainer = styled.div`
  margin: 10px 10px;
  ul {
    display: flex;
    flex-direction: column;
    
    li {
      padding: 5px;

      button{
        font-size: 0.875rem;
      }
    }

    .modifyTodoList{
      display: flex;
      justify-content: space-between;
    }
  }
`

export { TodoContainer, H1, TodoBox, ListContainer };