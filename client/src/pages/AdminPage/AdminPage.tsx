import NavbarComponent from "../HomePage/components/NavbarComponent.tsx";

interface Props {
  user: User;
  calendarToggle: boolean;
  setCalendarToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminPage = ({ user, calendarToggle, setCalendarToggle }: Props) => {
  return (
    <div>
      <NavbarComponent
        user={user}
        setCalendarToggle={setCalendarToggle}
        calendarToggle={calendarToggle}
      />
    </div>
  );
};

export default AdminPage;
