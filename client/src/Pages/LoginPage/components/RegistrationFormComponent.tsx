import { useState } from "react";
import PersonalInfoComponent from "./PersonalInfoComponent.tsx";
import LoginInformationComponent from "./LoginInformationComponent.tsx";
import WorkScheduleComponent from "./WorkScheduleComponent.tsx";
import UsersFormComponent from "./UsersFormComponent.tsx";

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
}

const RegistrationFormComponent = ({ changeLoginForm }: Props) => {
  const [currentRegistrationStep, setCurrentRegistrationStep] = useState(0);

  const [registrationInfo, setRegistrationInfo] = useState<IRegistrationInfo>({
    company: "",
    email: "",
    name: "",
    password: "",
    phone: "",
    surname: "",
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
          <LoginInformationComponent
            setStep={setStep}
            changeLoginForm={changeLoginForm}
            handleRegistrationInfo={handleRegistrationInfo}
          />
        );
      case 1:
        return (
          <PersonalInfoComponent
            setStep={setStep}
            handleRegistrationInfo={handleRegistrationInfo}
          />
        );
      case 2:
        return <WorkScheduleComponent setStep={setStep} />;
      case 3:
        return <UsersFormComponent setStep={setStep} />;
    }
  };

  return <>{renderStep(currentRegistrationStep)}</>;
};

export default RegistrationFormComponent;
