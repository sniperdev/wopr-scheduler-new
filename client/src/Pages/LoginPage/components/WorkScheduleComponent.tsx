import {Plus, DashLg as Minus} from 'react-bootstrap-icons'
import {useState} from "react";


const WorkScheduleComponent = () => {

	const [shifts, setShifts] = useState([{name: "", from: "", to: ""},{name: "", from: "", to: ""}]);

	const addTimeSpan = ()=>{
		setShifts([...shifts, {name:"",from:"",to:""}])
	}

	const removeTimeSpan = () =>{
		setShifts(shifts.slice(0,shifts.length-1))
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
			<div className="row row-cols-sm-6 gap-2">
				<button className="btn btn-success" type="button" onClick={addTimeSpan}><Plus className="fs-3"/></button>
				<button className="btn btn-danger" type="button" onClick={removeTimeSpan}><Minus className="fs-3"/></button>
			</div>
			<div className="row">
				<button className="btn btn-primary">Dalej</button>
			</div>
		</form>
	);
};

export default WorkScheduleComponent;
