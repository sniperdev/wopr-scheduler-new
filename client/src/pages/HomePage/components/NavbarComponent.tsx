import { Button, Container, Nav, Navbar } from "react-bootstrap";
interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setCalendarToggle: React.Dispatch<React.SetStateAction<boolean>>;
  calendarToggle: boolean;
}
const NavbarComponent = ({
  user,
  setUser,
  setCalendarToggle,
  calendarToggle,
}: Props) => {
  const handleNameClick = () => {
    localStorage.removeItem("token");
    setUser(undefined);
  };
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
            Zalogowany jako:{" "}
            <a
              href="#"
              onClick={handleNameClick}
            >{`${user.name} ${user.surname}`}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
