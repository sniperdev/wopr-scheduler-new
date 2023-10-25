import { Steps } from "../../../utils/interfaces/StepsInterface.ts";
import { useState } from "react";

interface Props {
  changeLoginForm: () => void;
}
interface IUser {
  email: string;
  password: string;
}
const LoginInformationComponent = ({
  setStep,
  changeLoginForm,
}: Steps & Props) => {
  const [loginInformation, setLoginInformation] = useState<IUser>({
    email: "",
    password: "",
  });
  const handleChange = (field: string, value: string) => {
    setLoginInformation((prevLoginInfo) => ({
      ...prevLoginInfo,
      [field]: value,
    }));
  };
  return (
    <form className="login-page-form d-flex flex-column gap-2 w-25">
      <input
        type="text"
        className="form-control"
        placeholder="Adres e-mail"
        onChange={(event) => handleChange("email", event.target.value)}
      />
      <input
        type="password"
        className="form-control"
        placeholder="Hasło"
        onChange={(event) => handleChange("password", event.target.value)}
      />
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => setStep(1)}
      >
        Zarejestruj się
      </button>
      <div className="text-center">
        <p>
          Masz już założone konto?{" "}
          <a href="#" onClick={changeLoginForm}>
            Zaloguj się
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginInformationComponent;
