import { Button, Modal } from "react-bootstrap";
import {selectUser} from "../../redux/slice/userSlice.ts";
import {useAppSelector} from "../../redux/hooks.ts";

interface Props {
  logoutModal: boolean;
  setLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}

const LogoutModal = ({
  logoutModal,
  setLogoutModal,
  handleLogout,
}: Props) => {
  const user = useAppSelector(selectUser);
  return (
    <Modal
      show={logoutModal}
      onHide={() => setLogoutModal(false)}
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Potwierdzenie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center"><p>Czy na pewno chcesz się wylogować?</p>
          {user.isAdmin && <p>Wszystkie niezapisane zmiany zostaną utracone.</p>}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleLogout}>
          Potwierdź
        </Button>
        <Button variant="primary" onClick={() => setLogoutModal(false)}>
          Anuluj
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
