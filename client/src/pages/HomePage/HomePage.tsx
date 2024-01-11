import "./HomePage.css";

import NavbarComponent from "./components/NavbarComponent.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddDateModal from "./components/AddDateModal.tsx";
import { useState } from "react";
import { DateClickArg, EventClickArg } from "fullcalendar";
import CalendarComponent from "./components/CalendarComponent.tsx";
import ReadyShiftsCalendarComponent from "./components/ReadyShiftsCalendarComponent.tsx";
import HelpOffcanvasComponent from "../../shared/components/HelpOffcanvasComponent.tsx";

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  calendarToggle: boolean;
  setCalendarToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Shift {
  id: number;
  title: string;
  start: string;
  end: string;
}
const HomePage = ({
  user,
  setUser,
  calendarToggle,
  setCalendarToggle,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

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
      <NavbarComponent
        user={user}
        setUser={setUser}
        setCalendarToggle={setCalendarToggle}
        calendarToggle={calendarToggle}
        saveShiftsMutation={undefined}
        setShowModal={undefined}
        setShowCanvas={setShowCanvas}
      ></NavbarComponent>
      {isPending && <p>Pobieranie danych kalendarza...</p>}
      {isError && <p>Wystąpił błąd</p>}
      <div className="mx-2 mt-2 calendar">
        {calendarToggle ? (
          <CalendarComponent
            data={data}
            handleDateClick={handleDateClick}
            handleRemoveEvent={handleRemoveEvent}
          />
        ) : (
          <ReadyShiftsCalendarComponent user={user} />
        )}
      </div>
      <AddDateModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        selectedDate={selectedDate}
        user={user}
      />
      <HelpOffcanvasComponent
        showCanvas={showCanvas}
        setShowCanvas={setShowCanvas}
      ></HelpOffcanvasComponent>
    </div>
  );
};

export default HomePage;
