import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import timeGridWeek from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./HomePage.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavbarComponent from "./components/NavbarComponent.tsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddDateModal from "./components/AddDateModal.tsx";
import { useState } from "react";
import { DateClickArg } from "fullcalendar";

interface Props {
  user: User;
}
const HomePage = ({ user }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const { isPending, isError, data } = useQuery({
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
    setShowModal(false);
    setSelectedDate("");
  };
  return (
    <div className="vh-100">
      <NavbarComponent user={user}></NavbarComponent>
      {isPending && <p>Pobieranie danych kalendarza...</p>}
      {isError && <p>Wystąpił błąd</p>}
      <div className="mx-2 mt-2 calendar">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridWeek,
            bootstrap5Plugin,
            interactionPlugin,
          ]}
          themeSystem="bootstrap5"
          initialView="dayGridMonth"
          headerToolbar={{
            start: "prev next",
            center: "title",
            end: "timeGridWeek dayGridMonth",
          }}
          events={data}
          dateClick={handleDateClick}
          locale="pl"
          weekNumberCalculation={"ISO"}
          height="100%"
        ></FullCalendar>
        <AddDateModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          selectedDate={selectedDate}
          user={user}
        />
      </div>
    </div>
  );
};

export default HomePage;
