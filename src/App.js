import GlobalStyle from "./style/GlobalStyle";
import Routers from "./routes/Routers";

import { BrowserRouter } from "react-router-dom";

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
