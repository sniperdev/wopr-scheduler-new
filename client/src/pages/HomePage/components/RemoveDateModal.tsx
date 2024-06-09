import { Button, Modal } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { EventImpl } from "@fullcalendar/core/internal";
import { useEffect } from "react";
import {useAppSelector} from "../../../redux/hooks.ts";
import {selectUserShifts} from "../../../redux/slice/calendarSlice.ts";
import {selectToken} from "../../../redux/slice/userSlice.ts";

interface Props {
  showModal: boolean;
  clickedEvent: EventImpl | undefined;
  handleRemoveEventClose: () => void;
}
interface Shift {
  id: number;
  title: string;
  start: string;
  end: string;
}

const RemoveDateModal = ({
  showModal,
  clickedEvent,
  handleRemoveEventClose,
}: Props) => {
  const token = useAppSelector(selectToken);
  const userShiftsData = useAppSelector(selectUserShifts);
  const removeDateMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(
        "http://localhost:3000/UsersWorkShifts/" + id,
        {
          headers: {
            "auth-token": token,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      handleRemoveEventClose();
    },
  });
  useEffect(() => {
    removeDateMutation.reset();
  }, [showModal]);
  const removeDate = () => {
    if (!clickedEvent) return;
    const date = clickedEvent.startStr.slice(0, 16);
    const clickedElement = userShiftsData.find(
      (shift: Shift) =>
        shift.title === clickedEvent.title && date === shift.start,
    );
    clickedElement && removeDateMutation.mutate(clickedElement.id);
  };
  return (
    <Modal
      show={showModal}
      onHide={handleRemoveEventClose}
      backdrop="static"
      centered
    >
      {!removeDateMutation.isError ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Potwierdzenie</Modal.Title>
          </Modal.Header>
          <Modal.Body>Czy na pewno chcesz usunąć tę zmianę?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={removeDate}
              disabled={removeDateMutation.isPending}
            >
              Potwierdź
            </Button>
            <Button variant="primary" onClick={handleRemoveEventClose}>
              Anuluj
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Body>
            <p className="text-center text-danger fw-bold mt-4">
              Ta zmiana jest już zaplanowana i nie może zostać usunięta
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleRemoveEventClose}>
              Zamknij
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default RemoveDateModal;
