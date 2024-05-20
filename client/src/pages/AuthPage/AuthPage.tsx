import "./AuthPage.css";
import { useState } from "react";
import RegisterComponent from "./components/RegisterComponent.tsx";
import SignInFormContainer from "./components/SignInForm/SignInFormContainer.tsx";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const AuthPage = ({ setUser }: Props) => {
  const [login, setLogin] = useState(true);

  const changeLoginForm = (): void => {
    setLogin(!login);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vw-100 vh-100">
      {login ? (
        <SignInFormContainer changeLoginForm={changeLoginForm} setUser={setUser} />
      ) : (
        <RegisterComponent changeLoginForm={changeLoginForm} />
      )}
    </div>
  );
};

export default AuthPage;
