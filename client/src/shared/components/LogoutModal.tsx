import { Button, Modal } from "react-bootstrap";

interface Props {
  logoutModal: boolean;
  setLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
  user: User;
}

const LogoutModal = ({
  logoutModal,
  setLogoutModal,
  handleLogout,
  user,
}: Props) => {
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
        <p>Czy na pewno chcesz się wylogować?</p>
        {user.isAdmin && <p>Wszystkie niezapisane zmiany zostaną utracone.</p>}
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
