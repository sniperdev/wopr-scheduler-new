import {Plus} from 'react-bootstrap-icons'
import {useState} from "react";


const WorkScheduleComponent = () => {

	const [shifts, setShifts] = useState([{name: "", from: "", to: ""},{name: "", from: "", to: ""}]);

	const addTimeSpan = ()=>{
		setShifts([...shifts, {name:"",from:"",to:""}])
	}

	return (
		<form className="login-page-form d-flex flex-column gap-2 w-25">
			<p className="text-center fw-bold">Wpisz godziny i nazwy zmian</p>
			<div className="row">
				<p className="col">Nazwa zmiany</p>
				<p className="col">Od</p>
				<p className="col">Do</p>
			</div>
			{shifts.map(
				(element)=> <div className="row gap-2">
					<input type="text" className="form-control col" value={element.name}/>
					<input type="time" className="form-control col" value={element.from}/>
					<input type="time" className="form-control col" value={element.to}/>
				</div>
			)}
			<div className="row row-cols-3">
				<button className="btn btn-primary" type="button" onClick={addTimeSpan}><Plus className="fs-3"/></button>
			</div>
		</form>
	);
};

export default WorkScheduleComponent;
