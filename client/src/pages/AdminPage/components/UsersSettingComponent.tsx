import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

interface Props {
  user: User;
}

interface NewUser {
  name: string;
  surname: string;
  phone: string;
  email: string;
  isAdmin: boolean;
}
const UsersSettingComponent = ({ user }: Props) => {
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    surname: "",
    phone: "",
    email: "",
    isAdmin: false,
  });

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery<
    {
      id: number;
      name: string;
      surname: string;
      email: string;
      isAdmin: boolean;
    }[]
  >({
    queryKey: ["users", user.company_id, user.id],
    queryFn: async () => {
      return axios
        .get<
          {
            id: number;
            name: string;
            surname: string;
            email: string;
            isAdmin: boolean;
          }[]
        >(`http://localhost:3000/users/${user.company_id}/${user.id}`, {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        })
        .then((res) => res.data);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      const response = await axios.delete(
        `http://localhost:3000/users/${userId}`,
        {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const addUserMutation = useMutation({
    mutationFn: async (newUser: NewUser) => {
      const response = await axios.post(
        `http://localhost:3000/users/${user.company_id}`,
        newUser,
        {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      setNewUser({
        name: "",
        surname: "",
        phone: "",
        email: "",
        isAdmin: false,
      });
      refetch();
    },
  });

  const handleDeleteUser = (userId: number) => {
    deleteUserMutation.mutate(userId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    const inputValue = name === "isAdmin" ? checked : value;
    setNewUser({ ...newUser, [name]: inputValue });
  };

  const handleAddUser = (event: React.FormEvent) => {
    event.preventDefault();
    if (newUser) addUserMutation.mutate(newUser);
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={8}>
          <h2>Użytkownicy</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id}>
                  <td>{`${user.name} ${user.surname}`}</td>
                  <td>{user.email}</td>
                  <td>
                    <Form.Check
                      type="switch"
                      label="Admin"
                      name="isAdmin"
                      defaultChecked={user.isAdmin}
                      disabled
                    />
                  </td>
                  <td className="text-center">
                    <Button onClick={() => handleDeleteUser(user.id)}>
                      Usuń
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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
        </Col>
      </Row>
    </Container>
  );
};

export default UsersSettingComponent;