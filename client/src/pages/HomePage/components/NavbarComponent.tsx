import { Container, Navbar } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="p-3 bg-body-tertiary">
      <Container>
        <Navbar.Brand>Scheduler App</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Zalogowany jako: <a href="#">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
