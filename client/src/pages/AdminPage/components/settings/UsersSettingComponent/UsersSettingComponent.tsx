import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import AddUserComponent from "./AddUserComponent.tsx";
import { NewUser } from "../../../../../utils/interfaces/NewUserInterface.ts";
import SuccessAddUserCard from "./SuccessAddUserCard.tsx";

interface Props {
  user: User;
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
    onSuccess: (data) => {
      console.log(data);
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
                <th>Typ</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id}>
                  <td>{`${user.name} ${user.surname}`}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Administrator" : "Pracownik"}</td>
                  <td className="text-center">
                    <Button onClick={() => handleDeleteUser(user.id)}>
                      Usuń
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex gap-4">
            <AddUserComponent
              newUser={newUser}
              setNewUser={setNewUser}
              addUserMutation={addUserMutation}
            ></AddUserComponent>
            {addUserMutation.isSuccess && (
              <SuccessAddUserCard
                newUser={addUserMutation.data.newUser}
              ></SuccessAddUserCard>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UsersSettingComponent;
