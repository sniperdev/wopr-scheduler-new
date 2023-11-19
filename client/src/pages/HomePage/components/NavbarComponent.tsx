import { Button, Container, Nav, Navbar } from "react-bootstrap";
interface Props {
  user: User;
  setCalendarToggle: React.Dispatch<React.SetStateAction<boolean>>;
  calendarToggle: boolean;
}
const NavbarComponent = ({
  user,
  setCalendarToggle,
  calendarToggle,
}: Props) => {
  return (
    <Navbar expand="lg" className="p-3 bg-body-tertiary">
      <Container>
        <Navbar.Brand>Scheduler App</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="mx-auto" navbarScroll>
            <Button
              className="me-2"
              onClick={() => setCalendarToggle(true)}
              active={calendarToggle}
            >
              Moje zmiany
            </Button>
            <Button
              onClick={() => setCalendarToggle(false)}
              active={!calendarToggle}
            >
              Gotowy grafik
            </Button>
          </Nav>
          <Navbar.Text>
            Zalogowany jako: <a href="#">{`${user.name} ${user.surname}`}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
