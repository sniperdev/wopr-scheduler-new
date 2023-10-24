import {useState} from "react";
import PersonalInfoComponent from "./PersonalInfoComponent.tsx";
import LoginInformationComponent from "./LoginInformationComponent.tsx";
import WorkScheduleComponent from "./WorkScheduleComponent.tsx";

interface Props{
	changeLoginForm: ()=>void;
}


const RegistrationFormComponent = ({changeLoginForm}:Props) => {
	const [currentRegistrationStep, setCurrentRegistrationStep] = useState(0)

	const setStep=(step:number)=>{
		return setCurrentRegistrationStep(step);
	}

	const renderStep=(currentRegistrationStep:number)=>{
		switch (currentRegistrationStep) {
			case 0: return <LoginInformationComponent setStep={setStep} changeLoginForm={changeLoginForm}/>
			case 1: return <PersonalInfoComponent setStep={setStep}/>
			case 2: return <WorkScheduleComponent setStep={setStep}/>
		}
	}

	return (
		<>
			{renderStep(currentRegistrationStep)}
		</>
	);
};

export default RegistrationFormComponent;
