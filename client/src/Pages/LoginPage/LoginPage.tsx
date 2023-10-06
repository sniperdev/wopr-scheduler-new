import './LoginPage.css'

const LoginPage = () => {
	return (
		<div className="d-flex align-items-center justify-content-center vw-100 vh-100">
			<form className="login-page-form d-flex flex-column gap-2 w-25">
				<input type="text" className="form-control" placeholder="Adres e-mail"/>
				<input type="text" className="form-control" placeholder="Hasło"/>
				<button type="submit" className="btn btn-primary">Zaloguj się</button>
				<div className="text-center">
					<p>Nie masz konta biznesowego? <a href="#">Zarejestruj się</a></p>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
