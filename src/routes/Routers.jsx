import IntroLoginPage from "../pages/Login/IntroLoginPage";
import UserInfo from "../contexts/LoginContext";
import LoginPage from "../pages/Login/LoginPage";
import SignUp from "../pages/Join/JoinPage";
import ProfileSettings from "../pages/Join/JoinInfo";
import Calendar from "../pages/Calendar/Calendar";
import Diary from "../pages/Diary/Diary";
import TodoList from "../pages/Todo/TodoList";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

const AppRoutes = () =>  {
  const userAccount = localStorage.getItem("accountName");

  return (
    <Routes>
      <Route path="/" element={<IntroLoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/join" element={<SignUp />} />
      <Route path={`/${userAccount}/joinModify`} element={<ProfileSettings />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/diary" element={<Diary />} />
      <Route path="/todo-list" element={<TodoList />} />
    </Routes>
  );
}

export default function Routers() {
  return (
    <Providers>
      <Router>
        <AppRoutes />
      </Router>
    </Providers>
  );
}