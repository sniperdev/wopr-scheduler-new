import "./AuthPage.css";
import { useState } from "react";
import LoginComponent from "./components/LoginComponent.tsx";
import RegisterComponent from "./components/RegisterComponent.tsx";

const AuthPage = () => {
  const [login, setLogin] = useState(true);

  const changeLoginForm = (): void => {
    setLogin(!login);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vw-100 vh-100">
      {login ? (
        <LoginComponent changeLoginForm={changeLoginForm} />
      ) : (
        <RegisterComponent changeLoginForm={changeLoginForm} />
      )}
    </div>
  );
};

export default AuthPage;
