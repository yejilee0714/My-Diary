import GlobalStyle from "./style/GlobalStyle";
import IntroLoginPage from "./pages/Login/IntroLoginPage";
import UserInfo from "./contexts/LoginContext";
import LoginPage from "./pages/Login/LoginPage";
import SignUp from "./pages/Join/JoinPage";

import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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

function App() {
  return (
    <Providers>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<IntroLoginPage />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/join" element={<SignUp />} />
        </Routes>
        <GlobalStyle />
      </BrowserRouter>
    </Providers>
  );
}

export default App;
