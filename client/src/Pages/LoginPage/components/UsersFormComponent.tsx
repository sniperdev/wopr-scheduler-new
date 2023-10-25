import { DashLg as Minus, Plus } from "react-bootstrap-icons";
import { useState } from "react";
import { Users } from "../../../utils/interfaces/UsersInterface.ts";
import { Steps } from "../../../utils/interfaces/StepsInterface.ts";

const UsersFormComponent = ({ setStep }: Steps) => {
  const [users, setUsers] = useState<Users[]>([
    { name: "", surname: "", email: "" },
    { name: "", surname: "", email: "" },
  ]);

  const handleInputChange = (
    index: number,
    field: keyof Users,
    value: string,
  ) => {
    const updatedShifts = [...users];
    updatedShifts[index][field] = value;
    setUsers(updatedShifts);
  };

  const addUser = () => {
    setUsers([...users, { name: "", surname: "", email: "" }]);
  };

  const removeUser = () => {
    setUsers(users.slice(0, users.length - 1));
  };

  return (
    <form className="login-page-form d-flex flex-column gap-2 w-25">
      <p className="text-center fw-bold">Dodawanie pracowników</p>
      <div className="row">
        <p className="col">Imię</p>
        <p className="col">Nazwisko</p>
        <p className="col">Email</p>
      </div>
      {users.map((element, index) => (
        <div className="row gap-2" key={index}>
          <input
            type="text"
            className="form-control col"
            value={element.name}
            onChange={(e) => handleInputChange(index, "name", e.target.value)}
          />
          <input
            type="text"
            className="form-control col"
            value={element.surname}
            onChange={(e) =>
              handleInputChange(index, "surname", e.target.value)
            }
          />
          <input
            type="text"
            className="form-control col"
            value={element.email}
            onChange={(e) => handleInputChange(index, "email", e.target.value)}
          />
        </div>
      ))}
      <div className="row row-cols-sm-6 gap-2">
        <button className="btn btn-success" type="button" onClick={addUser}>
          <Plus className="fs-3" />
        </button>
        <button className="btn btn-danger" type="button" onClick={removeUser}>
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
        <button className="btn btn-primary col" type="button">
          Dalej
        </button>
      </div>
    </form>
  );
};

export default UsersFormComponent;
