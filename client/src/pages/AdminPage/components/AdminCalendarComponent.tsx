import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridWeek from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import interactionPlugin from "@fullcalendar/interaction";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const AdminCalendarComponent = () => {
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
