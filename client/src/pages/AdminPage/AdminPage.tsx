import NavbarComponent from "../HomePage/components/NavbarComponent.tsx";
import AdminCalendarComponent from "./components/AdminCalendarComponent.tsx";
import "./AdminPage.css";
import ShiftListComponent from "./components/ShiftListComponent.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { lazy, Suspense, useEffect, useState } from "react";
import { AdminShiftItem } from "../../utils/interfaces/AdminShiftItem.ts";
import ReadyShiftsCalendarComponent from "../HomePage/components/ReadyShiftsCalendarComponent.tsx";
interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  calendarToggle: boolean;
  setCalendarToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsPanelModal = lazy(
  () => import("./components/SettingsPanelModal.tsx"),
);

const AdminPage = ({
  user,
  setUser,
  calendarToggle,
  setCalendarToggle,
}: Props) => {
  const [calendarEvents, setCalendarEvents] = useState<AdminShiftItem[]>([]);
  const [listEvents, setListEvents] = useState<AdminShiftItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  const UserShiftListMutation = useMutation({
    mutationFn: async () => {
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
    onSuccess: (data) => {
      setListEvents(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    UserShiftListMutation.mutate();
  }, []);

  const { isPending, isError, data } = useQuery({
    queryKey: ["readyShifts", user.company_id],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:3000/ScheduledWorkShifts/" + user.company_id,
        {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        },
      );
      return response.data;
    },
  });

  const saveShiftsMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "http://localhost:3000/createScheduledWorkShifts/",
        calendarEvents,
        {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      setCalendarEvents(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <div className="vh-100">
      <NavbarComponent
        user={user}
        setUser={setUser}
        setCalendarToggle={setCalendarToggle}
        calendarToggle={calendarToggle}
        saveShiftsMutation={saveShiftsMutation}
        setShowModal={setShowModal}
      />
      <div className="d-flex mx-2 mt-3 calendar gap-3">
        {calendarToggle && (
          <div className="w-25">
            {UserShiftListMutation.isError ? (
              <div>Error</div>
            ) : UserShiftListMutation.isPending ? (
              <div>Loading...</div>
            ) : (
              <ShiftListComponent
                data={listEvents}
                calendarEvents={calendarEvents}
                setCalendarEvents={setCalendarEvents}
                setListEvents={setListEvents}
                listEvents={listEvents}
              />
            )}
          </div>
        )}

        {calendarToggle ? (
          <div className="w-75">
            <AdminCalendarComponent
              calendarEvents={calendarEvents}
              setCalendarEvents={setCalendarEvents}
              setListEvents={setListEvents}
              listEvents={listEvents}
            />
          </div>
        ) : (
          <div className="w-100">
            <ReadyShiftsCalendarComponent
              user={user}
              isPending={isPending}
              isError={isError}
              data={data}
            />
          </div>
        )}
        <Suspense fallback={<div>Ładowanie ustawień...</div>}>
          {showModal && (
            <SettingsPanelModal
              showModal={showModal}
              setShowModal={setShowModal}
              user={user}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default AdminPage;
