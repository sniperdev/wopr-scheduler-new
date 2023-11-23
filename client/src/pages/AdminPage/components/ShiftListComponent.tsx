import { ListGroup } from "react-bootstrap";
import { AdminShiftItem } from "../../../utils/interfaces/AdminShiftItem.ts";
interface Props {
  data: AdminShiftItem[];
  calendarEvents: AdminShiftItem[];
  setCalendarEvents: React.Dispatch<React.SetStateAction<AdminShiftItem[]>>;
}
const ShiftListComponent = ({
  data,
  calendarEvents,
  setCalendarEvents,
}: Props) => {
  const handleClick = (item: AdminShiftItem) => {
    setCalendarEvents([...calendarEvents, item]);
  };
  return (
    <ListGroup>
      {data.map((item: AdminShiftItem) => (
        <ListGroup.Item key={item.id} onClick={() => handleClick(item)}>
          {item.title}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ShiftListComponent;
