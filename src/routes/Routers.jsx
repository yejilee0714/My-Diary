import Navigation from "../components/Common/Navbar";
import Modal from "../components/Modal/Modal";
import AlertModal from "../components/Modal/PopupModal";
import IntroLoginPage from "../pages/Login/IntroLoginPage"
import UserInfo from "../contexts/LoginContext";
import LoginPage from "../pages/Login/LoginPage";
import SignUp from "../pages/Join/JoinPage";
import ProfileSettings from "../pages/Join/JoinInfo";
import Calendar from "../pages/Calendar/Calendar"
import Diary from "../pages/Diary/Diary";
import TodoList from "../pages/Todo/TodoList";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Providers = ({ children }) => {
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  return (
    <UserInfo.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfo.Provider>
  );
};

export default function Routers() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<IntroLoginPage />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/join" element={<SignUp />} />
        <Route path="/join/modify" element={<ProfileSettings />} />
        <Route path="/calendar" element={<Calendar />}/>
        <Route path="/diary" element={<Diary />}/>
        <Route path="/todo-list" element={<TodoList />}/>
      </Routes>
    </Providers>
  );
}