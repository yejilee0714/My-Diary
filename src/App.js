import GlobalStyle from "./style/GlobalStyle";
import Routers from "./routes/Routers";

import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter> 
        <Routers />
      </BrowserRouter>
    </>
  );
}

export default App;
