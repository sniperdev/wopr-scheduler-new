import { Button, Container, Nav, Navbar } from "react-bootstrap";
interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setCalendarToggle: React.Dispatch<React.SetStateAction<boolean>>;
  calendarToggle: boolean;
  saveShiftsMutation: any;
}
const NavbarComponent = ({
  user,
  setUser,
  setCalendarToggle,
  calendarToggle,
  saveShiftsMutation,
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
          <Nav className="mx-auto gap-2" navbarScroll>
            <Button
              onClick={() => setCalendarToggle(true)}
              active={calendarToggle}
            >
              {user.isAdmin ? "Tworzenie grafiku" : "Mój grafik"}
            </Button>
            <Button
              onClick={() => setCalendarToggle(false)}
              active={!calendarToggle}
            >
              Gotowy grafik
            </Button>
            <Button variant="danger" onClick={saveShiftsMutation.mutate}>
              Zapisz grafik
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
