import { Container, Navbar } from "react-bootstrap";
interface Props {
  user: User;
}
const NavbarComponent = ({ user }: Props) => {
  return (
    <Navbar expand="lg" className="p-3 bg-body-tertiary">
      <Container>
        <Navbar.Brand>Scheduler App</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Zalogowany jako: <a href="#">{`${user.name} ${user.surname}`}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
