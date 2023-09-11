import GlobalStyle from "./style/GlobalStyle";
import Routers from "./routes/Routers";
import firebase from "./firebase/firebase";

import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   const auth = firebase.auth();
  // }, []);

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
