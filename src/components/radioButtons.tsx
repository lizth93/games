import Form from "react-bootstrap/Form";
interface Props {
  levels: string[];
}
function RadioButtons(props: Props) {
  return (
    <Form>
      <div key={`inline-radio`} className="mb-3">
        {props.levels.map((l: string, index: number) => {
          return (
            <Form.Check
              inline
              label={l}
              name={`group${index}`}
              type="radio"
              id={`inline-radio-${index}`}
            />
          );
        })}
      </div>
    </Form>
  );
}

export default RadioButtons;
