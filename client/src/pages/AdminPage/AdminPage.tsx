import NavbarComponent from "../HomePage/components/NavbarComponent.tsx";

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
  return (
    <div>
      <NavbarComponent
        user={user}
        setUser={setUser}
        setCalendarToggle={setCalendarToggle}
        calendarToggle={calendarToggle}
      />
    </div>
  );
};

export default AdminPage;
