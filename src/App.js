import GlobalStyle from "./style/GlobalStyle";
import Navigation from "./components/common/Navbar";
import Modal from "./components/modal/Modal";
import AlertModal from "./components/modal/PopupModal";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashPage from "./pages/splash/Splash";

function App() {
  return (
    <>
      <SplashPage />
      <GlobalStyle />
    </>
    // <Router>
    // <>
    //   <Navigation />
    //   <Routes>
    //       <Route path="/calendar" />
    //       <Route path="/diary" />
    //       <Route path="/todo-list" />
    //     </Routes>
    //   <Modal />
    //   <AlertModal
    //       submitText="로그아웃"
    //       // onSubmit={() => {
    //       //   logoutHandler();
    //       //   setModalOpen(false);
    //       // }}
    //       // onCancel={() => setModalOpen(false)}
    //     >
    //       로그아웃하시겠어요?
    //     </AlertModal>
    
    // </>

    // </Router>
  );
}

export default App;
