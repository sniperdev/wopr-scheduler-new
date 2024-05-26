import {
  Button, Container, Nav, Navbar,
} from 'react-bootstrap';
import { Gear, InfoCircle } from 'react-bootstrap-icons';
import { useState } from 'react';
import LogoutModal from '../../../shared/components/LogoutModal.tsx';
import { selectUser } from '../../../redux/slice/userSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { UserData } from '../../../App.tsx';
import { setScheduledShifts } from '../../../redux/slice/calendarSlice.ts';

interface Props {
  setCalendarToggle: React.Dispatch<React.SetStateAction<boolean>>;
  calendarToggle: boolean;
  saveShiftsMutation: any;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  setShowCanvas: React.Dispatch<React.SetStateAction<boolean>>;
}
function NavbarComponent({
  setCalendarToggle,
  calendarToggle,
  saveShiftsMutation,
  setShowModal,
  setShowCanvas,
}: Props) {
  const user: UserData = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [logoutModal, setLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogoutModal(false);
    setCalendarToggle(true);
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
              {user.isAdmin ? 'Edycja grafiku' : 'Mój grafik'}
            </Button>
            {user.isAdmin && (
              <Button
                variant="danger"
                onClick={() => dispatch(setScheduledShifts())}
                className="me-5"
              >
                Zapisz grafik
              </Button>
            )}
            <Button
              onClick={() => setCalendarToggle(false)}
              active={!calendarToggle}
            >
              Gotowy grafik
            </Button>
          </Nav>
          <Navbar.Text>
            Zalogowany jako:
            {' '}
            {`${user.name} ${user.surname}`}
            <a href="#" onClick={() => setLogoutModal(true)} className="px-2">
              Wyloguj
            </a>
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
      <LogoutModal
        logoutModal={logoutModal}
        setLogoutModal={setLogoutModal}
        handleLogout={handleLogout}
        user={user}
      />
    </Navbar>
  );
}

export default NavbarComponent;
