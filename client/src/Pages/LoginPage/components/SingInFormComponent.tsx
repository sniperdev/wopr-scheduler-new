import React from "react";

interface Props {
  changeLoginForm: () => void;
}

const SignInFormComponent = ({ changeLoginForm }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="login-page-form d-flex flex-column gap-2 w-25"
      >
        <input
          type="text"
          className="form-control"
          placeholder="Adres e-mail"
          name="email"
        />
        <input
          type="text"
          className="form-control"
          placeholder="Hasło"
          name="password"
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
    </>
  );
};

export default SignInFormComponent;
