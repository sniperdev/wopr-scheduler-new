import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridWeek from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import interactionPlugin from "@fullcalendar/interaction";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AdminShiftItem } from "../../../utils/interfaces/AdminShiftItem.ts";
import { EventClickArg } from "fullcalendar";

interface Props {
  calendarEvents: AdminShiftItem[];
  setCalendarEvents: React.Dispatch<React.SetStateAction<AdminShiftItem[]>>;
  listEvents: AdminShiftItem[];
  setListEvents: React.Dispatch<React.SetStateAction<AdminShiftItem[]>>;
}

const AdminCalendarComponent = ({
  calendarEvents,
  setCalendarEvents,
  listEvents,
  setListEvents,
}: Props) => {
  function reformatDate(dateStr: string) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  const handleEventClick = (info: EventClickArg) => {
    const clickedEvent = Number(info.event.id);
    const clickedEventList = calendarEvents.find(
      (element) => Number(element.id) === clickedEvent,
    );
    if (clickedEventList) {
      const date = reformatDate(clickedEventList.start);
      setListEvents([
        ...listEvents,
        {
          ...clickedEventList,
          date: date,
        },
      ]);
      setCalendarEvents(
        calendarEvents.filter((e) => Number(e.id) !== clickedEvent),
      );
    }
  };
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
      eventClick={handleEventClick}
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
