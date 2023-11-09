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
    setUser(response.data.data);
    navigate("/app");
    return response.data;
  }

  async function saveJWT(data: { jwt: string; user: User }) {
    const token = data.jwt;
    localStorage.setItem("token", token);
  }

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: saveJWT,
    onError: (err) => {
      console.log(err.message);
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
    <form
      onSubmit={handleFormSubmit}
      className="login-page-form d-flex flex-column gap-2 w-25"
    >
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
  );
};

export default SignInFormComponent;
