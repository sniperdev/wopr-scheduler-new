import "./HomePage.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavbarComponent from "./components/NavbarComponent.tsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddDateModal from "./components/AddDateModal.tsx";
import { useState } from "react";
import { DateClickArg } from "fullcalendar";
import CalendarComponent from "./components/CalendarComponent.tsx";

interface Props {
  user: User;
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

  const handleDateClick = (clickedDate: DateClickArg) => {
    setSelectedDate(clickedDate.dateStr);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    refetch();
    setShowModal(false);
    setSelectedDate("");
  };

  // const handleRemoveEvent = (clickedEvent: EventClickArg) => {
  //   const { event } = clickedEvent;
  //   console.log(event.title, event.startStr, event.endStr);
  // };

  return (
    <div className="vh-100">
      <NavbarComponent user={user}></NavbarComponent>
      {isPending && <p>Pobieranie danych kalendarza...</p>}
      {isError && <p>Wystąpił błąd</p>}
      <div className="mx-2 mt-2 calendar">
        <CalendarComponent data={data} handleDateClick={handleDateClick} />
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