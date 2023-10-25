import { Steps } from "../../../utils/interfaces/StepsInterface.ts";
import Joi from "joi";
import React, { useState } from "react";

interface Props {
  handleRegistrationInfo: (value: object) => void;
}

const personalInfoSchema = Joi.object({
  company: Joi.string(),
  name: Joi.string(),
  surname: Joi.string(),
  phone: Joi.string()
    .length(9)
    .pattern(/^[0-9]+$/),
});

const PersonalInfoComponent = ({
  setStep,
  handleRegistrationInfo,
}: Steps & Props) => {
  const [personalInfo, setPersonalInfo] = useState({
    company: "",
    name: "",
    surname: "",
    phone: "",
  });
  const [validationError, setValidationError] = useState<string>("");

  const handleInputChange = (field: string, value: string) => {
    setPersonalInfo((prevPersonalInfo) => ({
      ...prevPersonalInfo,
      [field]: value,
    }));
    setValidationError("");
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { error } = personalInfoSchema.validate(personalInfo);
    if (error) {
      setValidationError(error.message);
    } else {
      handleRegistrationInfo({
        company: personalInfo.company,
        name: personalInfo.name,
        surname: personalInfo.surname,
        phone: personalInfo.phone,
      });
      setStep(2);
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className="row gap-2 w-25">
      {validationError.length == 0 ? null : <p>Wprowadź poprawne dane</p>}
      <div>
        <input
          onChange={(e) => handleInputChange("company", e.target.value)}
          type="text"
          className="form-control"
          placeholder="Nazwa firmy"
          required
        />
      </div>
      <div className="col">
        <input
          onChange={(e) => handleInputChange("name", e.target.value)}
          type="text"
          className="form-control"
          placeholder="Imie"
          required
        />
      </div>
      <div className="col">
        <input
          onChange={(e) => handleInputChange("surname", e.target.value)}
          type="text"
          className="form-control"
          placeholder="Nazwisko"
          required
        />
      </div>
      <div>
        <input
          onChange={(e) => handleInputChange("phone", e.target.value)}
          type="text"
          className="form-control"
          placeholder="Numer telefonu"
          required
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary col-12">
          Dalej
        </button>
      </div>
    </form>
  );
};

export default PersonalInfoComponent;
