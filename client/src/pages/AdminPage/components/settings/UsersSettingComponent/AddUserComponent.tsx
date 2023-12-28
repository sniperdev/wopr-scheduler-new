import { Button, Form } from "react-bootstrap";
import { NewUser } from "../../../../../utils/interfaces/NewUserInterface.ts";
import React, { useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import Joi, { ValidationError } from "joi";

interface Props {
  newUser: NewUser;
  setNewUser: React.Dispatch<React.SetStateAction<NewUser>>;
  addUserMutation: UseMutationResult<any, Error, NewUser, unknown>;
}

const schema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.empty": "Imię nie może być puste",
    "string.min": "Imię musi zawierać minimum 2 znaki",
    "string.max": "Imię musi zawierać maksymalnie 30 znaków",
  }),
  surname: Joi.string().min(2).max(30).required().messages({
    "string.empty": "Nazwisko nie może być puste",
    "string.min": "Nazwisko musi zawierać minimum 2 znaki",
    "string.max": "Nazwisko musi zawierać maksymalnie 30 znaków",
  }),
  phone: Joi.string().pattern(new RegExp("^[0-9]{9}$")).required().messages({
    "string.empty": "Numer telefonu nie może być pusty",
    "string.pattern.base": "Numer telefonu musi zawierać 9 znaków",
    "string.max": "Nazwisko musi zawierać maksymalnie 30 znaków",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "pl"] },
    })
    .required()
    .messages({
      "string.empty": "Email nie może być pusty",
      "string.email": "Wpisz poprawny email",
    }),
  isAdmin: Joi.boolean(),
});

const AddUserComponent = ({ newUser, setNewUser, addUserMutation }: Props) => {
  const [errors, setErrors] = useState<ValidationError>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    const inputValue = name === "isAdmin" ? checked : value;
    setErrors(undefined);
    setNewUser({ ...newUser, [name]: inputValue });
  };

  const handleAddUser = (event: React.FormEvent) => {
    event.preventDefault();
    const { error } = schema.validate(newUser);
    if (error) {
      setErrors(error);
      return;
    }
    if (newUser) addUserMutation.mutate(newUser);
  };

  return (
    <>
      <h3>Dodaj użytkownika</h3>
      <Form onSubmit={handleAddUser}>
        <Form.Group>
          <Form.Label>Imię</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={handleInputChange}
            value={newUser.name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Nazwisko</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            onChange={handleInputChange}
            value={newUser.surname}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Numer telefonu</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            onChange={handleInputChange}
            value={newUser.phone}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={handleInputChange}
            value={newUser.email}
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Check
            type="switch"
            label="Nadać uprawnienia administratora?"
            name="isAdmin"
            onChange={handleInputChange}
          />
        </Form.Group>
        {errors && <p className="text-danger fw-bold">{errors.message}</p>}
        <Button type="submit" className="my-2">
          Dodaj użytkownika
        </Button>
      </Form>
    </>
  );
};

export default AddUserComponent;
