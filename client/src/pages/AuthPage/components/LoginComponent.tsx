import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  changeLoginForm: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

interface FormData {
  email: string;
  password: string;
}
const SignInFormComponent = ({ changeLoginForm, setUser }: Props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  async function login(loginParameters: FormData) {
    const response = await axios.post(
      "http://localhost:3000/login",
      loginParameters,
    );
    return response.data;
  }

  async function saveJWT(data: { jwt: string; data: User }) {
    setUser(data.data);
    const token = data.jwt;
    localStorage.setItem("token", token);
    if (data.data.isAdmin) navigate("/admin");
    else navigate("/app");
  }

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: saveJWT,
    onError: (err) => {
      console.log(err);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <div className="login-page-form">
      {loginMutation.isError && <p>Wystąpił błąd logowania</p>}
      <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Adres e-mail"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Hasło"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
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
