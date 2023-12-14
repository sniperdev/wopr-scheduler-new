import { useState } from "react";
import PersonalInfoFormComponent from "./PersonalInfoFormComponent.tsx";
import RegisterFormComponent from "./RegisterFormComponent.tsx";
import WorkShiftFormComponent from "./WorkShiftFormComponent.tsx";
import { WorkShifts } from "../../../utils/interfaces/WorkShiftsInterface.ts";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  changeLoginForm: () => void;
}

interface RegistrationInfo {
  email: string;
  password: string;
  company: string;
  name: string;
  surname: string;
  phone: string;
  address: string;
  shifts: WorkShifts[];
  isAdmin: boolean;
}

const RegisterComponent = ({ changeLoginForm }: Props) => {
  const navigate = useNavigate();
  const [currentRegistrationStep, setCurrentRegistrationStep] = useState(0);

  const [registrationInfo, setRegistrationInfo] = useState<RegistrationInfo>({
    company: "",
    address: "",
    email: "",
    name: "",
    password: "",
    phone: "",
    surname: "",
    shifts: [],
    isAdmin: true,
  });

  const registerUserMutation = useMutation({
    mutationFn: () => {
      return axios.post("http://localhost:3000/register", registrationInfo);
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  const setStep = (step: number) => {
    return setCurrentRegistrationStep(step);
  };

  const handleRegistrationInfo = (values: object) => {
    setRegistrationInfo({ ...registrationInfo, ...values });
  };

  const handleShifts = (value: WorkShifts[]) => {
    const newRegistrationInfo = { ...registrationInfo, shifts: [...value] };
    setRegistrationInfo(newRegistrationInfo);
  };

  const handleRegister = async () => {
    registerUserMutation.mutate();
  };

  const renderStep = (currentRegistrationStep: number) => {
    switch (currentRegistrationStep) {
      case 0:
        return (
          <RegisterFormComponent
            setStep={setStep}
            changeLoginForm={changeLoginForm}
            handleRegistrationInfo={handleRegistrationInfo}
          />
        );
      case 1:
        return (
          <PersonalInfoFormComponent
            setStep={setStep}
            handleRegistrationInfo={handleRegistrationInfo}
          />
        );
      case 2:
        return (
          <WorkShiftFormComponent
            setStep={setStep}
            handleShifts={handleShifts}
            handleRegister={handleRegister}
          />
        );
    }
  };

  return <>{renderStep(currentRegistrationStep)}</>;
};

export default RegisterComponent;
