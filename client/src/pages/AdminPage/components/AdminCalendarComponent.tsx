import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridWeek from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import interactionPlugin from "@fullcalendar/interaction";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AdminShiftItem } from "../../../utils/interfaces/AdminShiftItem.ts";

interface Props {
  calendarEvents: AdminShiftItem[];
}

const AdminCalendarComponent = ({ calendarEvents }: Props) => {
  return (
    <FullCalendar
      plugins={[
        dayGridPlugin,
        timeGridWeek,
        bootstrap5Plugin,
        interactionPlugin,
      ]}
      displayEventEnd={true}
      themeSystem="bootstrap5"
      initialView="dayGridMonth"
      events={calendarEvents}
      headerToolbar={{
        start: "prev next",
        center: "title",
        end: "timeGridWeek dayGridMonth",
      }}
      eventTimeFormat={{
        hour: "numeric",
        minute: "2-digit",
      }}
      locale="pl"
      weekNumberCalculation={"ISO"}
      height="100%"
    ></FullCalendar>
  );
};

export default AdminCalendarComponent;
