import { Card } from "react-bootstrap";

type NewUser = {
  name: string;
  surname: string;
  email: string;
  password: string;
};
interface Props {
  newUser: NewUser;
}

const SuccessAddUserCard = ({ newUser }: Props) => {
  return (
    <Card className="h-75 w-50">
      <Card.Header>Wiadomość do przesłania dla użytkownika</Card.Header>
      <Card.Body>
        <Card.Title>
          Witaj {newUser.name} {newUser.surname}!
        </Card.Title>
        <Card.Text>
          <p>
            Z przyjemnością informujemy, że dla Ciebie zostało utworzone konto
            na naszej stronie internetowej. Oto Twoje dane logowania:
          </p>
          <p>Login: {newUser.email}</p>
          <p>Hasło: {newUser.password}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SuccessAddUserCard;
