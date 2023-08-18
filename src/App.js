import GlobalStyle from "./style/GlobalStyle";
import IntroLoginPage from "./pages/Login/IntroLoginPage";
import UserInfo from "./contexts/LoginContext";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // BrowserRouter를 가져옵니다.

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
      <BrowserRouter> {/* BrowserRouter를 여기서 감싸줍니다. */}
        <Routes>
          <Route path="/" element={<IntroLoginPage />} />
        </Routes>
        <GlobalStyle />
      </BrowserRouter>
    </Providers>
  );
}

export default App;
