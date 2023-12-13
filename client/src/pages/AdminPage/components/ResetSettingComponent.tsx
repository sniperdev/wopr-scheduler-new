import { Button, Col, Container, Row } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  user: User;
}

const ResetSettingComponent = ({ user }: Props) => {
  const { mutate, status, error } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `http://localhost:3000/resetSettings/`,
        {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {},
  });
  const handleButtonClick = () => {
    mutate();
  };
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={8}>
          <h2>Reset ustawień</h2>
          {status === "pending" ? (
            <Button disabled>Ładowanie</Button>
          ) : (
            <Button onClick={handleButtonClick}>Reset</Button>
          )}
          {error && <p className="text-danger fw-bold">Wystąpił błąd</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default ResetSettingComponent;
