import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import SignInFormComponent from "./SignInFormComponent.tsx";

interface Props {
    changeLoginForm: () => void;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

interface FormData {
    email: string;
    password: string;
}

const SignInFormContainer = ({ changeLoginForm, setUser }: Props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const loginMutation = useMutation({
        mutationFn: (loginParams: FormData) => axios.post("http://localhost:3000/login", loginParams).then(res => res.data),
        onSuccess: (data: { jwt: string, data: User }) => {
            setUser(data.data);
            localStorage.setItem("token", data.jwt);
            data.data.isAdmin ? navigate("/admin") : navigate("/app");
        },
        onError: console.log,
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate(formData);
    };

    return (
        <SignInFormComponent
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            loginMutation={loginMutation}
            changeLoginForm={changeLoginForm}
        />
    );
};

export default SignInFormContainer;