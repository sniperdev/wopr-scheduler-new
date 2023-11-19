import "./HomePage.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavbarComponent from "./components/NavbarComponent.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddDateModal from "./components/AddDateModal.tsx";
import { useState } from "react";
import { DateClickArg, EventClickArg } from "fullcalendar";
import CalendarComponent from "./components/CalendarComponent.tsx";

interface Props {
  user: User;
}
interface Shift {
  id: number;
  title: string;
  start: string;
  end: string;
}
const HomePage = ({ user }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ["userShifts", user.id],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:3000/UsersWorkShifts/" + user.id,
        {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        },
      );
      return response.data;
    },
  });

  const removeDateMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(
        "http://localhost:3000/UsersWorkShifts/" + id,
        {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      refetch();
    },
  });
  const handleDateClick = (clickedDate: DateClickArg) => {
    setSelectedDate(clickedDate.dateStr);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    refetch();
    setShowModal(false);
    setSelectedDate("");
  };

  const handleRemoveEvent = (clickedEvent: EventClickArg) => {
    const { event } = clickedEvent;
    const date = event.startStr.slice(0, 16);
    const clickedElement = data.find(
      (shift: Shift) => shift.title === event.title && date === shift.start,
    );
    removeDateMutation.mutate(clickedElement.id);
  };

  return (
    <div className="vh-100">
      <NavbarComponent user={user}></NavbarComponent>
      {isPending && <p>Pobieranie danych kalendarza...</p>}
      {isError && <p>Wystąpił błąd</p>}
      <div className="mx-2 mt-2 calendar">
        <CalendarComponent
          data={data}
          handleDateClick={handleDateClick}
          handleRemoveEvent={handleRemoveEvent}
        />
      </div>
      <AddDateModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        selectedDate={selectedDate}
        user={user}
      />
    </div>
  );
};

export default HomePage;
