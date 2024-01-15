import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Gear, InfoCircle } from "react-bootstrap-icons";

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setCalendarToggle: React.Dispatch<React.SetStateAction<boolean>>;
  calendarToggle: boolean;
  saveShiftsMutation: any;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  setShowCanvas: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavbarComponent = ({
  user,
  setUser,
  setCalendarToggle,
  calendarToggle,
  saveShiftsMutation,
  setShowModal,
  setShowCanvas,
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
              {user.isAdmin ? "Edycja grafiku" : "Mój grafik"}
            </Button>
            <Button
              onClick={() => setCalendarToggle(false)}
              active={!calendarToggle}
            >
              Gotowy grafik
            </Button>
            {saveShiftsMutation && (
              <Button variant="danger" onClick={saveShiftsMutation.mutate}>
                Zapisz grafik
              </Button>
            )}
          </Nav>
          <Navbar.Text>
            Zalogowany jako:{" "}
            <a
              href="#"
              onClick={handleNameClick}
            >{`${user.name} ${user.surname}`}</a>
          </Navbar.Text>
          {saveShiftsMutation && (
            <Button
              className="mx-4"
              onClick={() => setShowModal!(true)}
              variant="secondary"
            >
              <Gear />
            </Button>
          )}
          <Button variant="info" onClick={() => setShowCanvas(true)}>
            <InfoCircle />
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
