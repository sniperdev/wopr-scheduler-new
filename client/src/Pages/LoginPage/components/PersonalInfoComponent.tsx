import {Steps} from "../../../utils/interfaces/StepsInterface.ts";


const PersonalInfoComponent = ({setStep}: Steps) => {


	return (
		<form className="row gap-2 w-25">
			<div>
				<input type="text" className="form-control" placeholder="Nazwa firmy"/>
			</div>
			<div className="col">
				<input type="text" className="form-control" placeholder="Imie"/>
			</div>
			<div className="col">
				<input type="text" className="form-control" placeholder="Nazwisko"/>
			</div>
			<div>
				<input type="text" className="form-control" placeholder="Numer telefonu"/>
			</div>
			<div>
				<button onClick={() => setStep(2)} className="btn btn-primary col-12">Dalej</button>
			</div>
		</form>
	);
};

export default PersonalInfoComponent;
