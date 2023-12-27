import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridWeek from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import interactionPlugin from "@fullcalendar/interaction";
import { DateClickArg, EventClickArg } from "fullcalendar";
import { WorkShifts } from "../../../utils/interfaces/WorkShiftsInterface.ts";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

interface Props {
  data: WorkShifts[];
  handleDateClick: (clickedEvent: DateClickArg) => void;
  handleRemoveEvent: (clickedEvent: EventClickArg) => void;
}

const CalendarComponent = ({
  data,
  handleDateClick,
  handleRemoveEvent,
}: Props) => {
  const dateClicked = (clickedEvent: DateClickArg) => {
    handleDateClick(clickedEvent);
  };

  const eventClicked = (clickedEvent: EventClickArg) => {
    handleRemoveEvent(clickedEvent);
  };

  return (
    <FullCalendar
      plugins={[
        dayGridPlugin,
        timeGridWeek,
        bootstrap5Plugin,
        interactionPlugin,
      ]}
      // displayEventEnd={true}
      themeSystem="bootstrap5"
      initialView="dayGridMonth"
      headerToolbar={{
        start: "prev next",
        center: "title",
        end: "timeGridWeek dayGridMonth",
      }}
      eventTimeFormat={{
        hour: "numeric",
        minute: "2-digit",
      }}
      events={data}
      eventClick={eventClicked}
      dateClick={dateClicked}
      locale="pl"
      weekNumberCalculation={"ISO"}
      height="100%"
    ></FullCalendar>
  );
};

export default CalendarComponent;
