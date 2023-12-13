import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  const [selectedOption, setSelectedOption] = useState<string>("");

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

  const saveShiftMutation = useMutation({
    mutationFn: async (selectedDate: string) => {
      const handleElement = data.find(
        (element: Shift) => element.id.toString() === selectedOption,
      );

      // const ShiftId = data.find((element) => {
      //   if (element.name === selectedOption) {
      //     return element.id;
      //   }
      // });

      const formatedDate = selectedDate.slice(0, 10);

      const response = await axios.post(
        "http://localhost:3000/UsersWorkShifts/add",
        {
          user_id: user.id,
          start: `${formatedDate}T${handleElement.start}`,
          end: `${formatedDate}T${handleElement.end}`,
          shift: handleElement.id.toString(),
        },
        {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      handleCloseModal();
    },
  });

  const saveShift = () => {
    saveShiftMutation.mutate(selectedDate);
  };

  useEffect(() => {
    saveShiftMutation.reset();
  }, [handleCloseModal]);

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
        <p>Data: {selectedDate.slice(0, 10)}</p>
        <Form.Label>Wybierz zmianę</Form.Label>
        {saveShiftMutation.isError && (
          <p className="text-danger">
            Nie udało się zapisać zmiany. Spróbuj ponownie
          </p>
        )}
        {isError ? (
          <p>Nie udało się pobrać zmian</p>
        ) : (
          <Form.Select
            onChange={(e) => setSelectedOption(e.target.value)}
            defaultValue=""
          >
            <option value="">Wybierz...</option>
            {isSuccess &&
              data.map((element: Shift) => (
                <option key={element.id} value={element.id.toString()}>
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
          onClick={saveShift}
          disabled={selectedOption === ""}
        >
          Zapisz
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDateModal;
