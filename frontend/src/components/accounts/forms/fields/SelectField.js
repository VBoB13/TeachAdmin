import React from "react";

export function SelectOption(props) {
  return (
    <option value={`${props.option_value}`}>{`${props.option_text}`}</option>
  );
}

export default function SelectField(props) {
  // Function for handling SelectField options
  const generate_options = () => {
    let element_list = [];
    element_list.push(
      <SelectOption key={0} option_value="" option_text="None" />
    );
    let count = 1;
    for (var [code, name] of Object.entries(props.options)) {
      element_list.push(
        <SelectOption key={count} option_value={code} option_text={name} />
      );
      count += 1;
    }

    return element_list;
  };

  return (
    <div className="form-group">
      <label htmlFor={props.fieldname}>
        {props.fieldname[0].toUpperCase() + props.fieldname.slice(1)}:
      </label>
      <select
        name={`${props.fieldname}`}
        id={`${props.fieldID}`}
        className="countries"
        defaultValue={props.student.country ? `${props.student.country}` : ""}
      >
        {generate_options()}
      </select>
    </div>
  );
}
