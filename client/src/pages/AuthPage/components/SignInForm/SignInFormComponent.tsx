import React from "react";

interface Props {
  formData: { email: string; password: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
  changeLoginForm: () => void;
}

const SignInFormComponent: React.FC<Props> = ({
  formData,
  handleInputChange,
  handleFormSubmit,
  changeLoginForm,
}) => {
  return (
    <div className="login-page-form">
      {/*{loginMutation.isError && (*/}
      {/*  <p className="text-center text-danger fw-bold">*/}
      {/*    Wystąpił błąd logowania*/}
      {/*  </p>*/}
      {/*)}*/}
      <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Adres e-mail"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          className="form-control"
          placeholder="Hasło"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          Zaloguj się
        </button>
        <div className="text-center">
          <p>
            Nie masz konta biznesowego?{" "}
            <a href="#" onClick={changeLoginForm}>
              Zarejestruj się
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignInFormComponent;
