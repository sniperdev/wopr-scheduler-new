import { Steps } from "../../../utils/interfaces/StepsInterface.ts";
import React, { useState } from "react";
import Joi from "joi";

interface Props {
  changeLoginForm: () => void;
  handleRegistrationInfo: (value: object) => void;
}

interface User {
  email: string;
  password: string;
  repeatPassword: string;
}

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "pl"] },
    })
    .required(),
  password: Joi.string().required().min(8),
  repeatPassword: Joi.ref("password"),
});

const RegisterFormComponent = ({
  setStep,
  changeLoginForm,
  handleRegistrationInfo,
}: Steps & Props) => {
  const [loginInformation, setLoginInformation] = useState<User>({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [validationError, setValidationError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInformation({ ...loginInformation, [name]: value });
    setValidationError("");
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = loginSchema.validate(loginInformation);
    if (error) {
      setValidationError(error.message);
    } else {
      handleRegistrationInfo({
        email: loginInformation.email,
        password: loginInformation.password,
      });
      setStep(1);
    }
  };

  return (
    <form
      onSubmit={handleSubmitForm}
      className="login-page-form d-flex flex-column gap-2 w-25"
    >
      {validationError && (
        <p className="text-danger text-center fw-bold">
          Wprowadź poprawne dane
        </p>
      )}
      <input
        type="text"
        className="form-control"
        placeholder="Adres e-mail"
        name="email"
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        className="form-control"
        placeholder="Hasło"
        name="password"
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        className="form-control"
        placeholder="Powtórz hasło"
        name="repeatPassword"
        onChange={handleInputChange}
        required
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

export default RegisterFormComponent;
