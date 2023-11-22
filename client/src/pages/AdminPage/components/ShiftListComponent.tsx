import { ListGroup } from "react-bootstrap";
import { AdminShiftItem } from "../../../utils/interfaces/AdminShiftItem.ts";
interface Props {
  data: AdminShiftItem[];
}
const ShiftListComponent = ({ data }: Props) => {
  return (
    <ListGroup>
      {data.map((item: AdminShiftItem) => (
        <ListGroup.Item>{item.title}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ShiftListComponent;
