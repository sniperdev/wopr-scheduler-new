import { Button, Form, Modal } from "react-bootstrap";

interface Props {
  showModal: boolean;
  handleCloseModal: () => void;
  selectedDate: string;
}

const AddDateModal = ({ showModal, handleCloseModal, selectedDate }: Props) => {
  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Dodaj nową zmianę</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Data: {selectedDate}</p>
        <label>Wybierz zmianę</label>
        <Form.Select>
          <option>Wybierz zmianę</option>
          <option value="R">R</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Zamknij
        </Button>
        <Button variant="primary" onClick={handleCloseModal}>
          Zapisz
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDateModal;
