import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />}></Route>
    </Routes>
  );
}

export default App;
