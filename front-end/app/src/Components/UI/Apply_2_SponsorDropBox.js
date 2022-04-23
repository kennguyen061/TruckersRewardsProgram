import "./Apply_2_SponsorDropBox.css";

export function Dropdown(props) {
  return (
    <div action={props.action} className="organize">
      <label>{props.formLabel}</label>
      <select id="sponsors" name="sponsors">
        {props.children}
      </select>
      <button type="submit" value={props.buttonText}>
        {" "}
        SUBMIT{" "}
      </button>
    </div>
  );
}

export function Option(props) {
  return <option selected={props.selected}>{props.value}</option>;
}
