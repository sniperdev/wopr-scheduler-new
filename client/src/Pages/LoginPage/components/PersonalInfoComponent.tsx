import {Steps} from "../../../utils/interfaces/StepsInterface.ts";


const PersonalInfoComponent = ({setStep}: Steps) => {


	return (
		<form className="login-page-form d-flex flex-column gap-2 w-25">
			<input type="text" className="form-control" placeholder="Nazwa firmy"/>
			<div className="row">
				<div className="col">
					<input type="text" className="form-control" placeholder="Imie"/>
				</div>
				<div className="col">
					<input type="text" className="form-control" placeholder="Nazwisko"/>
				</div>
			</div>

			<input type="text" className="form-control" placeholder="Numer telefonu"/>

			<button onClick={() => setStep(2)} className="btn btn-primary">Dalej</button>
		</form>
	);
};

export default PersonalInfoComponent;
