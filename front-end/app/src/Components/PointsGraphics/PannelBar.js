import "./PannelBar";
import Collapsible from "react-collapsible";

function Accord() {
  return (
    <div>
      <Collapsible trigger="First">
        <p>
          This is the collapsible content. It can be any element or React
          component you like.
        </p>
        <p>
          It can even be another Collapsible component. Check out the next
          section!
        </p>
      </Collapsible>
      <Collapsible trigger="second">
        <p>
          This is the collapsible content. It can be any element or React
          component you like.
        </p>
        <p>
          It can even be another Collapsible component. Check out the next
          section!
        </p>
      </Collapsible>
    </div>
  );
}

export default Accord;
