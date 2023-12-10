import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button, Form, ListGroup } from "react-bootstrap";

interface Props {
  user: User;
}
const UsersSettingComponent = ({ user }: Props) => {
  const [newUserName, setNewUserName] = useState("");

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery<{ id: number; name: string; surname: string; email: string }[]>({
    queryKey: ["users", user.company_id],
    queryFn: async () => {
      return axios
        .get<User[]>(`http://localhost:3000/users/${user.company_id}`, {
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

  // const addUserMutation = useMutation(
  //   (userName: string) =>
  //     axios.post(
  //       `http://localhost:3000/users`,
  //       { name: userName, company_id: user.company_id },
  //       {
  //         headers: {
  //           "auth-token": `${localStorage.getItem("token")}`,
  //         },
  //       },
  //     ),
  //   {
  //     onSuccess: () => {
  //       // Po pomyślnym dodaniu użytkownika, odśwież listę użytkowników
  //       queryClient.invalidateQueries(["users", user.company_id]);
  //     },
  //   },
  // );

  const handleDeleteUser = (userId: number) => {
    deleteUserMutation.mutate(userId);
  };

  const handleAddUser = (event: React.FormEvent) => {
    event.preventDefault();
    // addUserMutation.mutate(newUserName);
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2>Użytkownicy</h2>
      <ListGroup>
        {users?.map((user) => (
          <ListGroup.Item key={user.id}>
            <div className="d-flex justify-content-between">
              <span>{`${user.name} ${user.surname}`}</span>
              <span>{user.email}</span>
              <Button onClick={() => handleDeleteUser(user.id)}>Usuń</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={handleAddUser}>
        <Form.Group>
          <Form.Label>Nowy użytkownik</Form.Label>
          <Form.Control
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Dodaj użytkownika</Button>
      </Form>
    </div>
  );
};

export default UsersSettingComponent;
