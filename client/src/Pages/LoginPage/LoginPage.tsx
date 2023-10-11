import './LoginPage.css'
import {useState} from "react";
import SignInFormComponent from "./components/SingInFormComponent.tsx";
import RegistrationFormComponent from "./components/RegistrationFormComponent.tsx";

const LoginPage = () => {
	const [login, setLogin] = useState(true)

	const changeLoginForm = () : void=>{
		setLogin(!login)
	}

	return (
		<div className="d-flex align-items-center justify-content-center vw-100 vh-100">
			{
				login?<SignInFormComponent changeLoginForm={changeLoginForm}/>:<RegistrationFormComponent changeLoginForm={changeLoginForm}/>
			}
		</div>
	);
};

export default LoginPage;
