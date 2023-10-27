import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  changeLoginForm: () => void;
}

interface IMutation {
  email: string;
  password: string;
}

const SignInFormComponent = ({ changeLoginForm }: Props) => {
  const login = async (loginParameters: IMutation) => {
    return await axios
      .post("http://localhost:3000/login", {
        email: loginParameters.email,
        password: loginParameters.password,
      })
      .then((response) => {
        return response.data;
      });
  };

  const saveJWT = async (data: { jwt: string }) => {
    if (data) {
      const token: string = data.jwt;
      localStorage.setItem("token", token);
    }
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => saveJWT(data),
    onError: (err) => {
      console.log("TEST" + err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    loginMutation.mutate({ email: email, password: password });
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
