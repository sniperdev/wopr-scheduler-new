import { Button, Form } from "react-bootstrap";
import { NewUser } from "../../../../../utils/interfaces/NewUserInterface.ts";
import React from "react";
import { UseMutationResult } from "@tanstack/react-query";

interface Props {
  newUser: NewUser;
  setNewUser: React.Dispatch<React.SetStateAction<NewUser>>;
  addUserMutation: UseMutationResult<any, Error, NewUser, unknown>;
}

const AddUserComponent = ({ newUser, setNewUser, addUserMutation }: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    const inputValue = name === "isAdmin" ? checked : value;
    setNewUser({ ...newUser, [name]: inputValue });
  };

  const handleAddUser = (event: React.FormEvent) => {
    event.preventDefault();
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
        <Button type="submit" className="my-2">
          Dodaj użytkownika
        </Button>
      </Form>
    </>
  );
};

export default AddUserComponent;
