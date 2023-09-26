import GlobalStyle from "./style/GlobalStyle";
import Routers from "./routes/Routers";
import firebase from "./firebase/firebase";

function App() {

  return (
    <>
      <GlobalStyle />
      <Routers />
    </>
  );
}

export default App;
