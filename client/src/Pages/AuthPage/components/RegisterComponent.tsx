import { useState } from "react";
import PersonalInfoFormComponent from "./PersonalInfoFormComponent.tsx";
import RegisterFormComponent from "./RegisterFormComponent.tsx";
import WorkShiftFormComponent from "./WorkShiftFormComponent.tsx";
import EmployeeAccountFormComponent from "./EmployeeAccountFormComponent.tsx";

interface Props {
  changeLoginForm: () => void;
}

interface IRegistrationInfo {
  email: string;
  password: string;
  company: string;
  name: string;
  surname: string;
  phone: string;
  shifts: string[];
}

const RegisterComponent = ({ changeLoginForm }: Props) => {
  const [currentRegistrationStep, setCurrentRegistrationStep] = useState(0);

  const [registrationInfo, setRegistrationInfo] = useState<IRegistrationInfo>({
    company: "",
    email: "",
    name: "",
    password: "",
    phone: "",
    surname: "",
    shifts: [],
  });

  const setStep = (step: number) => {
    return setCurrentRegistrationStep(step);
  };

  const handleRegistrationInfo = (values: object) => {
    setRegistrationInfo({ ...registrationInfo, ...values });
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
            handleRegistrationInfo={handleRegistrationInfo}
          />
        );
      case 3:
        return <EmployeeAccountFormComponent setStep={setStep} />;
    }
  };

  return <>{renderStep(currentRegistrationStep)}</>;
};

export default RegisterComponent;
