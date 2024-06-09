import './HomePage.css';
import { useState } from 'react';
import { DateClickArg, EventClickArg } from 'fullcalendar';
import { EventImpl } from '@fullcalendar/core/internal';
import NavbarComponent from './components/NavbarComponent.tsx';
import AddDateModal from './components/AddDateModal.tsx';
import CalendarComponent from './components/CalendarComponent.tsx';
import ReadyShiftsCalendarComponent from './components/ReadyShiftsCalendarComponent.tsx';
import HelpOffcanvasComponent from '../../shared/components/HelpOffcanvasComponent.tsx';
import RemoveDateModal from './components/RemoveDateModal.tsx';
import { UserData } from '../../App.tsx';
import {
  getUserShifts, selectUserShifts, selectUserShiftsError, selectUserShiftsLoading
} from "../../redux/slice/calendarSlice.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";

interface Props {
  user: UserData;
  calendarToggle: boolean;
  setCalendarToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function HomePage({ calendarToggle, setCalendarToggle }: Props) {

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showAddDateModal, setShowAddDateModal] = useState(false);
  const [showRemoveDateModal, setShowRemoveDateModal] = useState(false);
  const [clickedEvent, setClickedEvent] = useState<EventImpl>();
  const [showCanvas, setShowCanvas] = useState(false);

  const dispatch = useAppDispatch();
  const userShifts = useAppSelector(selectUserShifts);
  const userShiftsLoading = useAppSelector(selectUserShiftsLoading);
  const userShiftsError = useAppSelector(selectUserShiftsError);


  const handleDateClick = (clickedDate: DateClickArg) => {
    setSelectedDate(clickedDate.dateStr);
    setShowAddDateModal(true);
  };

  const handleCloseModal = () => {
    dispatch(getUserShifts());
    setShowAddDateModal(false);
    setSelectedDate('');
  };

  const handleRemoveEvent = (clickedEvent: EventClickArg) => {
    const { event } = clickedEvent;
    setClickedEvent(event);
    setShowRemoveDateModal(true);
  };

  const handleRemoveEventClose = () => {
    setShowRemoveDateModal(false);
    dispatch(getUserShifts());
  };

  return (
    <div className="vh-100">
      <NavbarComponent
        setCalendarToggle={setCalendarToggle}
        calendarToggle={calendarToggle}
        setShowCanvas={setShowCanvas}
      />
      {userShiftsLoading &&
        <div className="position-absolute top-50 start-50 translate-middle bg-white w-50 h-25 z-1">
          <p className="fs-1 fw-bold">Pobieranie danych kalendarza...</p>
        </div>}
      {userShiftsError && <p>Wystąpił błąd</p>}
      <div className="mx-2 mt-2 calendar">
        {calendarToggle ? (
          <CalendarComponent
            data={userShifts}
            handleDateClick={handleDateClick}
            handleRemoveEvent={handleRemoveEvent}
          />
        ) : (
          <ReadyShiftsCalendarComponent/>
        )}
      </div>
      <AddDateModal
        showModal={showAddDateModal}
        handleCloseModal={handleCloseModal}
        selectedDate={selectedDate}
      />
      <RemoveDateModal
        showModal={showRemoveDateModal}
        clickedEvent={clickedEvent}
        handleRemoveEventClose={handleRemoveEventClose}
      />
      <HelpOffcanvasComponent
        showCanvas={showCanvas}
        setShowCanvas={setShowCanvas}
      />
    </div>
  );
}

export default HomePage;
