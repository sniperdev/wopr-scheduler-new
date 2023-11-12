import { Steps } from "../../../utils/interfaces/StepsInterface.ts";
import Joi from "joi";
import React, { useState } from "react";

interface Props {
  handleRegistrationInfo: (value: object) => void;
}

const personalInfoSchema = Joi.object({
  company: Joi.string().required(),
  address: Joi.string().required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  phone: Joi.string()
    .length(9)
    .pattern(/^[0-9]+$/)
    .required(),
});

const PersonalInfoFormComponent = ({
  setStep,
  handleRegistrationInfo,
}: Steps & Props) => {
  const [personalInfo, setPersonalInfo] = useState({
    company: "",
    address: "",
    name: "",
    surname: "",
    phone: "",
  });
  const [validationError, setValidationError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
    setValidationError("");
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = personalInfoSchema.validate(personalInfo);
    if (error) {
      setValidationError(error.message);
    } else {
      handleRegistrationInfo(personalInfo);
      setStep(2);
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className="row gap-2 w-25">
      {validationError && <p>Wprowadź poprawne dane</p>}
      <div>
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control"
          placeholder="Nazwa firmy"
          name="company"
          required
        />
      </div>
      <div>
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control"
          placeholder="Adres firmy"
          name="address"
          required
        />
      </div>
      <div className="col">
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control"
          placeholder="Imie"
          name="name"
          required
        />
      </div>
      <div className="col">
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control"
          placeholder="Nazwisko"
          name="surname"
          required
        />
      </div>
      <div>
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control"
          placeholder="Numer telefonu"
          name="phone"
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

export default PersonalInfoFormComponent;
