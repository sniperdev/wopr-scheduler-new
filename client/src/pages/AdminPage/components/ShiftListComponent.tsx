import { ListGroup } from 'react-bootstrap';
import { AdminShiftItem } from '../../../utils/interfaces/AdminShiftItem.ts';
import './ShiftListComponent.css';

interface Props {
  data: AdminShiftItem[];
  calendarEvents: AdminShiftItem[];
  // setCalendarEvents: React.Dispatch<React.SetStateAction<AdminShiftItem[]>>;
  listEvents: AdminShiftItem[];
  // setListEvents: React.Dispatch<React.SetStateAction<AdminShiftItem[]>>;
}
function ShiftListComponent({
  data,
  calendarEvents,
  // setCalendarEvents,
  listEvents,
  // setListEvents,
}: Props) {
  const handleClick = (item: AdminShiftItem) => {
    // setCalendarEvents([...calendarEvents, item]);
    const newListEvents = listEvents.filter((e) => e.id !== item.id);
    // setListEvents(newListEvents);
  };
  return (
    <>
      {data.length === 0 && <p>Brak dostępnych zmian</p>}
      <ListGroup className="shifts-list overflow-y-scroll">
        {data.map((item: AdminShiftItem) => (
          <ListGroup.Item key={item.id} onClick={() => handleClick(item)}>
            {item.title}
            {' '}
            -
            <b>{item.date}</b>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default ShiftListComponent;
