import Navigation from '../../components/Common/Navbar'
import MainHeader from '../../components/Header/MainHeader'
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { TodoContainer, H1, TodoBox, ListContainer } from './TodoListStyle'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'

export default function TodoList(){
  const todayMonth = format(new Date(), 'M');
  const todayDay = format(new Date(), 'd');
  const todayWeekday = format(new Date(), 'E', { locale: ko });

  const initialDiaryData = {
    text: "오늘 할 일은 무엇인가요?",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [todoData, setTodoData] = useState(initialDiaryData);
  const [completedTasks, setCompletedTasks] = useState([]);

  const db = firebase.firestore();

  const today = new Date();
  const todoId = format(today, 'yyyyMMdd');
  const userID = JSON.parse(localStorage.getItem('userId'));
  const userDocRef = db.collection('users').doc(userID);
  const todoDocRef = userDocRef.collection('todos').doc(todoId);

  // 컴포넌트가 마운트될 때 Firestore에서 데이터를 가져옴
  useEffect(() => {
    // Firestore에서 해당 일기 문서를 가져와서 todoData 상태에 설정
    todoDocRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setTodos(data.text || "");
        setCompletedTasks(data.completedTasks || []);
      } else {
        console.log('해당 투두 리스트 문서를 찾을 수 없습니다.');
        // If the document doesn't exist, set todos to an empty array or any default value
        setTodos([]);
        setCompletedTasks([]);
      }
    }).catch((error) => {
      console.error('투두 데이터를 가져오는 중 오류 발생:', error);
    });
  }, []);

  // 저장 버튼 이벤트
  const handleSaveClick = () => {
    setIsEditing(false);

    // 'diaries' 컬렉션에 추가할 일기 데이터 객체 생성
    const todoData = {
      text: todos,
    };

    userDocRef.collection('todos').doc(todoId).set(todoData)
    .then(() => {
      console.log('투두가 성공적으로 저장되었습니다.');
    })
    .catch((error) => {
      console.error('투두 저장 중 오류 발생:', error);
    });
  };

  // 새로운 Todo 항목을 추가하는 함수
  const addTodo = () => {
    if (inputText.trim() !== '') {
      setTodos([...todos, inputText]);
      setInputText('');
      setCompletedTasks([...completedTasks, false]);
    }
  };

  // 수정 버튼 이벤트
  const handleEditClick = () => {
    setIsEditing(true);

    // 편집 중인 내용을 diaryData로 설정
    setTodoData({
      text: todos,
    });
  };

  // 취소 버튼 이벤트
  const handleCancelClick = () => {
    setTodos(todoData.text);
    setIsEditing(false);
  };

  // 삭제 버튼 이벤트
  const handleDeleteClick = () => {
    todoDocRef.delete()
      .then(() => {
        window.location.reload();
    }).catch((error) => {
      console.error('일기 삭제 중 오류 발생:', error);
    });
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1); // 선택한 할 일을 배열에서 제거
  
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks.splice(index, 1);
  
    // 상태 업데이트
    setTodos(updatedTodos);
    setCompletedTasks(updatedCompletedTasks);
  
    // Firestore에 업데이트된 할 일 목록을 저장
    userDocRef.collection('todos').doc(todoId).set({
      text: updatedTodos,
      completedTasks: updatedCompletedTasks,
    })
    .then(() => {
      console.log('할 일이 성공적으로 삭제되었습니다.');
    })
    .catch((error) => {
      console.error('할 일 삭제 중 오류 발생:', error);
    });
  };

  const handleTaskCompletion = (index) => {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks[index] = !updatedCompletedTasks[index];
    
    userDocRef.collection('todos').doc(todoId).update({ completedTasks: updatedCompletedTasks })
    .then(() => {
      console.log('투두 완료 상태가 업데이트되었습니다.');
    })
    .catch((error) => {
      console.error('투두 완료 상태 업데이트 중 오류 발생:', error);
    });
    setCompletedTasks(updatedCompletedTasks);
  };

  return (
    <>
      <MainHeader />
      <TodoContainer>
        <H1>
          {todayMonth}월 {todayDay}일 {todayWeekday}요일
        </H1>
        <span className="title">TODO-LIST</span>
        <div className='todoBox'>
          {isEditing ? (
            <>
              <TodoBox>
                <input
                  type="text"
                  className='inputText'
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="할 일을 추가해주세요~!"
                />
                <button className="inputBtn" onClick={addTodo}>추가</button>
              </TodoBox>
              <ListContainer>
                <ul>
                  {todos.map((todo, index) => (
                    <li key={index} className='modifyTodoList'>
                      <span>• {todo}</span>
                      <button onClick={() => handleDeleteTodo(index)}>삭제</button>
                    </li>
                  ))}
                </ul>
              </ListContainer>
            </>
          ) : (
            <>
            {todos && todos.length > 0  ? (
              <TodoBox>
                <ListContainer>
                  <ul>
                    {todos.map((todo, index) => (
                      <li key={index}>
                        <input
                          type="checkbox"
                          checked={completedTasks[index]}
                          onChange={() => handleTaskCompletion(index)}
                        />
                        {todo}
                      </li>
                    ))}
                  </ul>
                </ListContainer>
              </TodoBox>
            ) : (
              <TodoBox>
                <p className = "todoPlaceHolder">당신의 오늘 story가 궁금합니다~</p>
              </TodoBox>
              )}
            </>
          )}
        <div className="btnGroup">
            {isEditing ? (
              <>
                <button onClick={handleSaveClick}>저장</button>
                <span> | </span>
                <button onClick={handleCancelClick}>취소</button>
              </>
            ) : (
              <>
              { todos && todos.length > 0 ? (
                <>
                  <button onClick={handleEditClick}>수정</button>
                  <span> | </span>
                  <button onClick={handleDeleteClick}>삭제</button>
                </>
                ) : (
                  <button onClick={handleEditClick}> TODO-LIST 작성하기</button>
                )
              }
              </>
            )}
          </div>
        </div>
      </TodoContainer>
      <Navigation />
    </>
  )
}