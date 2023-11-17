import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridWeek from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import interactionPlugin from "@fullcalendar/interaction";
import { DateClickArg } from "fullcalendar";

interface Props {
  data: any;
  handleDateClick: (clickedEvent: DateClickArg) => void;
}

const CalendarComponent = ({ data, handleDateClick }: Props) => {
  const dateClicked = (clickedEvent: DateClickArg) => {
    handleDateClick(clickedEvent);
  };

  return (
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
      // eventClick={handleRemoveEvent}
      dateClick={dateClicked}
      locale="pl"
      weekNumberCalculation={"ISO"}
      height="100%"
    ></FullCalendar>
  );
};

export default CalendarComponent;
