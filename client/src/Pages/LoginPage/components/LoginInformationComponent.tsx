import { Steps } from "../../../utils/interfaces/StepsInterface.ts";
import React, { useState } from "react";
import Joi from "joi";

interface Props {
  changeLoginForm: () => void;
}

interface IUser {
  email: string;
  password: string;
  repeatPassword: string;
}

const loginSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "pl"] },
  }),
  password: Joi.string(),
  repeatPassword: Joi.ref("password"),
});

const LoginInformationComponent = ({
  setStep,
  changeLoginForm,
}: Steps & Props) => {
  const [loginInformation, setLoginInformation] = useState<IUser>({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setLoginInformation((prevLoginInfo) => ({
      ...prevLoginInfo,
      [field]: value,
    }));
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { error, value } = loginSchema.validate(loginInformation);
    if (error) {
      console.log(error);
    } else {
      console.log(value);
      setStep(2);
    }
  };

  return (
    <form
      onSubmit={(event) => handleSubmitForm(event)}
      className="login-page-form d-flex flex-column gap-2 w-25"
    >
      <input
        type="text"
        className="form-control"
        placeholder="Adres e-mail"
        onChange={(event) => handleInputChange("email", event.target.value)}
      />
      <input
        type="password"
        className="form-control"
        placeholder="Hasło"
        onChange={(event) => handleInputChange("password", event.target.value)}
      />
      <input
        type="password"
        className="form-control"
        placeholder="Powtórz hasło"
        onChange={(event) =>
          handleInputChange("repeatPassword", event.target.value)
        }
      />
      <button type="submit" className="btn btn-primary">
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
