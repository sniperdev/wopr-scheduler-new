import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import timeGridWeek from "@fullcalendar/timegrid";
import "./HomePage.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavbarComponent from "./components/NavbarComponent.tsx";
interface Props {
  user: User;
}
const HomePage = ({ user }: Props) => {
  return (
    <div className="vh-100">
      <NavbarComponent user={user}></NavbarComponent>
      <div className="mx-2 mt-2 calendar">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridWeek, bootstrap5Plugin]}
          themeSystem="bootstrap5"
          initialView="dayGridMonth"
          headerToolbar={{
            start: "prev next",
            center: "title",
            end: "timeGridWeek dayGridMonth",
          }}
          locale="pl"
          weekNumberCalculation={"ISO"}
          height="100%"
        ></FullCalendar>
      </div>
    </div>
  );
};

export default HomePage;
