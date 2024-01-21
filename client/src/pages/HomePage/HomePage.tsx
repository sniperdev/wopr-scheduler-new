import "./HomePage.css";

import NavbarComponent from "./components/NavbarComponent.tsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddDateModal from "./components/AddDateModal.tsx";
import { useState } from "react";
import { DateClickArg, EventClickArg } from "fullcalendar";
import CalendarComponent from "./components/CalendarComponent.tsx";
import ReadyShiftsCalendarComponent from "./components/ReadyShiftsCalendarComponent.tsx";
import HelpOffcanvasComponent from "../../shared/components/HelpOffcanvasComponent.tsx";
import RemoveDateModal from "./components/RemoveDateModal.tsx";
import { EventImpl } from "@fullcalendar/core/internal";

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  calendarToggle: boolean;
  setCalendarToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomePage = ({
  user,
  setUser,
  calendarToggle,
  setCalendarToggle,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showAddDateModal, setShowAddDateModal] = useState(false);
  const [showRemoveDateModal, setShowRemoveDateModal] = useState(false);
  const [clickedEvent, setClickedEvent] = useState<EventImpl>();
  const [showCanvas, setShowCanvas] = useState(false);

  const {
    isPending: isUserShiftsPending,
    isError: isUserShiftsError,
    data: userShiftsData,
    refetch: refetchUserShifts,
  } = useQuery({
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

  const {
    isPending: isReadyShiftsPending,
    isError: isReadyShiftsError,
    data: readyShiftsData,
  } = useQuery({
    queryKey: ["readyShifts", user.company_id],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:3000/ScheduledWorkShifts/" + user.company_id,
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
    setShowAddDateModal(true);
  };

  const handleCloseModal = () => {
    refetchUserShifts();
    setShowAddDateModal(false);
    setSelectedDate("");
  };

  const handleRemoveEvent = (clickedEvent: EventClickArg) => {
    const { event } = clickedEvent;
    setClickedEvent(event);
    setShowRemoveDateModal(true);
  };

  const handleRemoveEventClose = () => {
    setShowRemoveDateModal(false);
    refetchUserShifts();
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
      {isUserShiftsPending && <p>Pobieranie danych kalendarza...</p>}
      {isUserShiftsError && <p>Wystąpił błąd</p>}
      <div className="mx-2 mt-2 calendar">
        {calendarToggle ? (
          <CalendarComponent
            data={userShiftsData}
            handleDateClick={handleDateClick}
            handleRemoveEvent={handleRemoveEvent}
          />
        ) : (
          <ReadyShiftsCalendarComponent
            isPending={isReadyShiftsPending}
            isError={isReadyShiftsError}
            data={readyShiftsData}
          />
        )}
      </div>
      <AddDateModal
        showModal={showAddDateModal}
        handleCloseModal={handleCloseModal}
        selectedDate={selectedDate}
        user={user}
      />
      <RemoveDateModal
        showModal={showRemoveDateModal}
        clickedEvent={clickedEvent}
        handleRemoveEventClose={handleRemoveEventClose}
        userShiftsData={userShiftsData}
      />
      <HelpOffcanvasComponent
        showCanvas={showCanvas}
        setShowCanvas={setShowCanvas}
      />
    </div>
  );
};

export default HomePage;
