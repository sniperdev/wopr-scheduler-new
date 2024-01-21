import { Button, Modal } from "react-bootstrap";

interface Props {
  handleDelete: () => void;
  removeModal: boolean;
  setRemoveModal: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

const RemoveSettingModal = ({
  handleDelete,
  removeModal,
  setRemoveModal,
  message,
}: Props) => {
  return (
    <Modal
      show={removeModal}
      onHide={() => setRemoveModal(false)}
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Potwierdzenie</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDelete}>
          Potwierdź
        </Button>
        <Button variant="primary" onClick={() => setRemoveModal(false)}>
          Anuluj
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveSettingModal;
