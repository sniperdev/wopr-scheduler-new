import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface Props {
  showModal: boolean;
  handleCloseModal: () => void;
  selectedDate: string;
  user: User;
}

interface Shift {
  id: number;
  name: string;
  start: string;
  end: string;
  created_at: string;
  updated_at: string;
  company_id: number;
}

const AddDateModal = ({
  showModal,
  handleCloseModal,
  selectedDate,
  user,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>();

  const { isError, isSuccess, data } = useQuery({
    queryKey: ["shifts", user.company_id],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:3000/Shifts/" + user.company_id,
        {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        },
      );
      return response.data;
    },
  });

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
        {isError ? (
          <p>Nie udało się pobrać zmian</p>
        ) : (
          <Form.Select onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="">Wybierz...</option>
            {isSuccess &&
              data.map((element: Shift) => (
                <option key={element.id} value={element.name}>
                  {element.name}
                </option>
              ))}
          </Form.Select>
        )}
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
