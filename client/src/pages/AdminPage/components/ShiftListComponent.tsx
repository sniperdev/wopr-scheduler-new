import { ListGroup } from 'react-bootstrap';
import { AdminShiftItem } from '../../../utils/interfaces/AdminShiftItem.ts';
import './ShiftListComponent.css';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { addScheduledShifts, deleteAdminShifts, selectAdminShifts } from '../../../redux/slice/calendarSlice.ts';

function ShiftListComponent() {
  const dispatch = useAppDispatch();
  const listEvents = useAppSelector(selectAdminShifts);
  const handleClick = (item: AdminShiftItem) => {
    dispatch(addScheduledShifts(item));
    dispatch(deleteAdminShifts(item.id));
  };
  return (
    <>
      {listEvents.length === 0 && <p>Brak dostępnych zmian</p>}
      <ListGroup className="shifts-list overflow-y-scroll">
        {listEvents.map((item: AdminShiftItem) => (
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
