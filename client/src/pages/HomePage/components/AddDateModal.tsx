import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";

interface Props {
  showModal: boolean;
  handleCloseModal: () => void;
  selectedDate: string;
}

const AddDateModal = ({ showModal, handleCloseModal, selectedDate }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>();

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
        <Form.Label>Wybierz zmianę</Form.Label>
        <Form.Select onChange={(e) => setSelectedOption(e.target.value)}>
          <option value="">Wybierz...</option>
          <option value="R">R</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Zamknij
        </Button>
        <Button
          variant="primary"
          onClick={handleCloseModal}
          disabled={selectedOption === ""}
        >
          Zapisz
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDateModal;
