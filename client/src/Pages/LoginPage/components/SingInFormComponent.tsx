interface Props{
	changeLoginForm: ()=>void;
}

const SignInFormComponent = ({changeLoginForm}:Props) => {
	return (
		<form className="login-page-form d-flex flex-column gap-2 w-25">
				<input type="text" className="form-control" placeholder="Adres e-mail"/>
				<input type="text" className="form-control" placeholder="Hasło"/>
				<button type="submit" className="btn btn-primary">Zaloguj się</button>
				<div className="text-center">
					<p>Nie masz konta biznesowego? <a href="#" onClick={changeLoginForm}>Zarejestruj się</a></p>
				</div>
			</form>
	);
};

export default SignInFormComponent;
