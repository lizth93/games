import Form from "react-bootstrap/Form";
interface Props {
  levels: string[];
  onClick: (level: string) => void;
}
function RadioButtons(props: Props) {
  return (
    <Form>
      <div key={`inline-radio`} className="mb-3">
        {props.levels.map((l: string, index: number) => {
          return (
            <Form.Check
              key={index}
              inline
              label={l}
              name={`group1`}
              type="radio"
              id={`inline-radio-${index}`}
              onClick={() => props.onClick(l)}
            />
          );
        })}
      </div>
    </Form>
  );
}

export default RadioButtons;
