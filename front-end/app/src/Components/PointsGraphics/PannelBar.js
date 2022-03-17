import "./PannelBar.css";
import { ListGroup, ListGroupItem, Badge } from "reactstrap";

function PannelBar() {
  return (
    <div className="Pannel">
      <ListGroup>
        <ListGroupItem className="justify-content-between">
          Point + <Badge pill>14 Notifications</Badge>
        </ListGroupItem>
        <ListGroupItem className="justify-content-between">
          Point - <Badge pill>2 Notifications</Badge>
        </ListGroupItem>
        <ListGroupItem className="justify-content-between">
          Reaction to Apeals <Badge pill>1 Notifications</Badge>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}

export default PannelBar;
