import { Plus, DashLg as Minus } from "react-bootstrap-icons";
import React, { useState } from "react";
import { WorkShifts } from "../../../utils/interfaces/WorkShiftsInterface.ts";
import { Steps } from "../../../utils/interfaces/StepsInterface.ts";

interface Props {
  handleShifts: (value: WorkShifts[]) => void;
  handleRegister: () => void;
}

const WorkShiftFormComponent = ({
  setStep,
  handleShifts,
  handleRegister,
}: Steps & Props) => {
  const [error, setError] = useState(false);
  const [shifts, setShifts] = useState<WorkShifts[]>([
    { name: "", start: "", end: "" },
    { name: "", start: "", end: "" },
  ]);

  const addTimeSpan = () => {
    setShifts([...shifts, { name: "", start: "", end: "" }]);
  };

  const removeTimeSpan = () => {
    setShifts(shifts.slice(0, shifts.length - 1));
  };

  const handleInputChange = (
    index: number,
    field: keyof WorkShifts,
    value: string,
  ) => {
    const updatedShifts = [...shifts];
    updatedShifts[index][field] = value;
    setShifts(updatedShifts);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let localError = false;
    shifts.forEach((element) => {
      const startDate = new Date(`1970-01-01T${element.start}:00`);
      const endDate = new Date(`1970-01-01T${element.end}:00`);
      if (startDate > endDate) {
        localError = true;
        setError(true);
      }
    });
    if (localError) return;
    handleShifts(shifts);
    handleRegister();
  };

  return (
    <form
      onSubmit={handleSubmitForm}
      className="login-page-form d-flex flex-column gap-2 w-25"
    >
      {error && (
        <p className="text-danger fw-bold text-center">
          Godzina rozpoczęcia nie może być większa od godziny zakończenia
        </p>
      )}
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
            required
          />
          <input
            type="time"
            className="form-control col"
            value={element.start}
            onChange={(e) => handleInputChange(index, "start", e.target.value)}
            required
          />
          <input
            type="time"
            className="form-control col"
            value={element.end}
            onChange={(e) => handleInputChange(index, "end", e.target.value)}
            required
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
        <button className="btn btn-primary col" type="submit">
          Załóż konto
        </button>
      </div>
    </form>
  );
};

export default WorkShiftFormComponent;
