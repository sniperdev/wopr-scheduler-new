import "./HomePage.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavbarComponent from "./components/NavbarComponent.tsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddDateModal from "./components/AddDateModal.tsx";
import { useEffect, useState } from "react";
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
  const [userShifts, setUserShifts] = useState<Shift[]>([]);

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

  useEffect(() => {
    setUserShifts(data);
  }, [data]);

  const handleRemoveEvent = (clickedEvent: EventClickArg) => {
    const { event } = clickedEvent;
    const date = event.startStr.slice(0, 16);
    const newUserShifts = userShifts.filter(
      (shift: Shift) => !(shift.title === event.title && date === shift.start),
    );
    console.log("userShifts: ", userShifts);
    console.log("newUserShifts: ", newUserShifts);
    setUserShifts(newUserShifts);
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
