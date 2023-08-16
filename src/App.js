import MainHeader from "./components/header/MainHeader";
import UploadHeader from "./components/header/UploadHeader";
import GlobalStyle from "./style/GlobalStyle";
import Navigation from "./components/common/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
    <>
      <Navigation />
      <Routes>
          <Route path="/calendar" />
          <Route path="/diary" />
          <Route path="/todo-list" />
        </Routes>
      <GlobalStyle />
    </>

    </Router>
  );
}

export default App;
