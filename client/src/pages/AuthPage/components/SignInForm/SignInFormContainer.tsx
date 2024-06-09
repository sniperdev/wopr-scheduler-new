import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInFormComponent from './SignInFormComponent.tsx';
import { useAppDispatch } from '../../../../redux/hooks.ts';
import { getUser } from '../../../../redux/slice/userSlice.ts';

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

  const [formData, setFormData] = useState<LoginData>({
    email: 'kurek@gmail.com',
    password: 'vu7mj8wd',
    // email: 'wrona@gmail.com',
    // password: '12345678',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });


  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(getUser(formData))
      .then(() => {
        navigate('/app');
      });
  };

  return (
    <SignInFormComponent
      formData={formData}
      handleInputChange={handleInputChange}
      handleFormSubmit={handleFormSubmit}
        // loginMutation={loginMutation}
      changeLoginForm={changeLoginForm}
    />
  );
};

export default SignInFormContainer;
