import { Button, Modal } from "react-bootstrap";

interface Props {
  logoutModal: boolean;
  setLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}

const LogoutModal = ({ logoutModal, setLogoutModal, handleLogout }: Props) => {
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
        <p>Wszystkie niezapisane zmiany zostaną utracone.</p>
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
