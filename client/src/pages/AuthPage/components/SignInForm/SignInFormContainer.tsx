import React, { useEffect, useState } from "react";
import SignInFormComponent from "./SignInFormComponent.tsx";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.ts";
import { getUser, selectIsAdmin } from "../../../../redux/slice/userSlice.ts";
import { useNavigate } from "react-router-dom";

interface Props {
  changeLoginForm: () => void;
}

export interface LoginData {
  email: string;
  password: string;
}

const SignInFormContainer: React.FC<Props> = ({ changeLoginForm }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(selectIsAdmin);

  const [formData, setFormData] = useState<LoginData>({
    email: "wrona@gmail.com",
    password: "12345678",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(getUser(formData));
    // console.log(isAdmin);
    // isAdmin ? navigate("/admin") : navigate("/app");
  };

  return (
    <>
      <SignInFormComponent
        formData={formData}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        // loginMutation={loginMutation}
        changeLoginForm={changeLoginForm}
      />
    </>
  );
};

export default SignInFormContainer;
