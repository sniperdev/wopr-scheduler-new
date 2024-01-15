import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridWeek from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

interface Props {
  user: User;
  isPending: boolean;
  isError: boolean;
  data: any;
}

const ReadyShiftsCalendarComponent = ({
  user,
  isPending,
  isError,
  data,
}: Props) => {
  // const { isPending, isError, data } = useQuery({
  //   queryKey: ["readyShifts", user.company_id],
  //   queryFn: async () => {
  //     const response = await axios.get(
  //       "http://localhost:3000/ScheduledWorkShifts/" + user.company_id,
  //       {
  //         headers: {
  //           "auth-token": `${localStorage.getItem("token")}`,
  //         },
  //       },
  //     );
  //     return response.data;
  //   },
  // });
  return (
    <>
      {isPending && <div>Loading...</div>}
      {isError && <div>Error</div>}
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
        locale="pl"
        weekNumberCalculation={"ISO"}
        height="100%"
        events={data}
      ></FullCalendar>
    </>
  );
};

export default ReadyShiftsCalendarComponent;
