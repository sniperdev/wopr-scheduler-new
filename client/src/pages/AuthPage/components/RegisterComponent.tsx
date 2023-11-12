import { useState } from "react";
import PersonalInfoFormComponent from "./PersonalInfoFormComponent.tsx";
import RegisterFormComponent from "./RegisterFormComponent.tsx";
import WorkShiftFormComponent from "./WorkShiftFormComponent.tsx";
import EmployeeAccountFormComponent from "./EmployeeAccountFormComponent.tsx";
import { WorkShifts } from "../../../utils/interfaces/WorkShiftsInterface.ts";

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
}

const RegisterComponent = ({ changeLoginForm }: Props) => {
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
          />
        );
      case 3:
        return <EmployeeAccountFormComponent setStep={setStep} />;
    }
  };

  return <>{renderStep(currentRegistrationStep)}</>;
};

export default RegisterComponent;
