import { Plus, DashLg as Minus } from "react-bootstrap-icons";
import { useState } from "react";
import { Shifts } from "../../../utils/interfaces/ShiftsInterface.ts";
import { Steps } from "../../../utils/interfaces/StepsInterface.ts";

const WorkScheduleComponent = ({ setStep }: Steps) => {
  const [shifts, setShifts] = useState<Shifts[]>([
    { name: "", from: "", to: "" },
    { name: "", from: "", to: "" },
  ]);

  const addTimeSpan = () => {
    setShifts([...shifts, { name: "", from: "", to: "" }]);
  };

  const removeTimeSpan = () => {
    setShifts(shifts.slice(0, shifts.length - 1));
  };

  const handleInputChange = (
    index: number,
    field: keyof Shifts,
    value: string,
  ) => {
    const updatedShifts = [...shifts];
    updatedShifts[index][field] = value;
    setShifts(updatedShifts);
  };

  return (
    <form className="login-page-form d-flex flex-column gap-2 w-25">
      <p className="text-center fw-bold">Wpisz godziny i nazwy zmian</p>
      <div className="row">
        <p className="col">Nazwa zmiany</p>
        <p className="col">Od</p>
        <p className="col">Do</p>
      </div>
      {shifts.map((element, index) => (
        <div className="row gap-2" key={index}>
          <input
            type="text"
            className="form-control col"
            value={element.name}
            onChange={(e) => handleInputChange(index, "name", e.target.value)}
          />
          <input
            type="time"
            className="form-control col"
            value={element.from}
            onChange={(e) => handleInputChange(index, "from", e.target.value)}
          />
          <input
            type="time"
            className="form-control col"
            value={element.to}
            onChange={(e) => handleInputChange(index, "to", e.target.value)}
          />
        </div>
      ))}
      <div className="row row-cols-sm-6 gap-2">
        <button className="btn btn-success" type="button" onClick={addTimeSpan}>
          <Plus className="fs-3" />
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={removeTimeSpan}
        >
          <Minus className="fs-3" />
        </button>
      </div>
      <div className="row gap-2">
        <button
          onClick={() => setStep(1)}
          className="btn btn-secondary col"
          type="button"
        >
          Wróć
        </button>
        <button
          onClick={() => setStep(3)}
          className="btn btn-primary col"
          type="button"
        >
          Dalej
        </button>
      </div>
    </form>
  );
};

export default WorkScheduleComponent;
