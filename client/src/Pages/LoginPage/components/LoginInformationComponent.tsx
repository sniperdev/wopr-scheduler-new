import {Steps} from "../../../utils/interfaces/StepsInterface.ts";

interface Props {
	changeLoginForm: ()=>void;
}

const LoginInformationComponent = ({setStep, changeLoginForm}: Steps & Props) => {
	return (
		<form className="login-page-form d-flex flex-column gap-2 w-25">
			<input type="text" className="form-control" placeholder="Adres e-mail"/>
			<input type="text" className="form-control" placeholder="Hasło"/>
			<button type="submit" className="btn btn-primary" onClick={()=>setStep(1)}>Zarejestruj się</button>
			<div className="text-center">
				<p>Masz już założone konto? <a href="#" onClick={changeLoginForm}>Zaloguj się</a></p>
			</div>
		</form>
	);
};

export default LoginInformationComponent;
