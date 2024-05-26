import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridWeek from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import {useAppSelector} from "../../../redux/hooks.ts";
import {
  selectScheduledShifts,
  selectScheduledShiftsError,
  selectScheduledShiftsLoading
} from "../../../redux/slice/calendarSlice.ts";



const ReadyShiftsCalendarComponent = () => {
  const scheduledShifts = useAppSelector(selectScheduledShifts);
  const scheduledShiftsLoading = useAppSelector(selectScheduledShiftsLoading);
  const scheduledShiftsError = useAppSelector(selectScheduledShiftsError);

  return (
    <>
      {scheduledShiftsLoading && <div>Loading...</div>}
      {scheduledShiftsError && <div>Error</div>}
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
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
        }}
        locale="pl"
        weekNumberCalculation={"ISO"}
        height="100%"
        events={scheduledShifts}
      ></FullCalendar>
    </>
  );
};

export default ReadyShiftsCalendarComponent;
