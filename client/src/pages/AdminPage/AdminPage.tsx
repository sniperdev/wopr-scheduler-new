import NavbarComponent from "../HomePage/components/NavbarComponent.tsx";
import AdminCalendarComponent from "./components/AdminCalendarComponent.tsx";
import "./AdminPage.css";
import ShiftListComponent from "./components/ShiftListComponent.tsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  calendarToggle: boolean;
  setCalendarToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminPage = ({
  user,
  setUser,
  calendarToggle,
  setCalendarToggle,
}: Props) => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["allUsersShifts", user.company_id],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:3000/AdminUsersWorkShifts/" + user.company_id,
        {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        },
      );
      return response.data;
    },
  });
  return (
    <div className="vh-100">
      <NavbarComponent
        user={user}
        setUser={setUser}
        setCalendarToggle={setCalendarToggle}
        calendarToggle={calendarToggle}
      />
      <div className="d-flex mx-2 mt-3 calendar gap-3">
        <div className="w-25">
          {isError ? (
            <div>Error</div>
          ) : isPending ? (
            <div>Loading...</div>
          ) : (
            <ShiftListComponent data={data} />
          )}
        </div>
        <div className="w-75">
          <AdminCalendarComponent />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
