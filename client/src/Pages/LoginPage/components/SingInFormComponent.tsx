import React from "react";
import { useMutation } from "@tanstack/react-query";

interface Props {
  changeLoginForm: () => void;
}

interface IMutation {
  email: string;
  password: string;
}

const SignInFormComponent = ({ changeLoginForm }: Props) => {
  const login = async (loginParameters: IMutation) => {
    return fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(loginParameters),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Błąd HTTP: " + response.json());
      }
      return response.json();
    });
  };

  const saveJWT = () => {
    const token = loginMutation.data.jwt;
    localStorage.setItem("token", token);
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: saveJWT,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    loginMutation.mutateAsync({ email: email, password: password });
  };
  if (loginMutation.data) console.log(loginMutation.data.jwt);
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
