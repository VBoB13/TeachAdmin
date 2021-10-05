import React from "react";

export function SelectOption(props) {
  const selected_flag = props.selected_flag ? true : false;
  return (
    <option
      value={`${props.option_value}`}
      selected={selected_flag}
    >{`${props.option_text}`}</option>
  );
}

export default function SelectField(props) {
  // Function for handling SelectField options
  const generate_options = (student = null) => {
    let element_list = [];
    element_list.push(
      <SelectOption key={0} option_value="" option_text="None" />
    );
    let count = 1;
    console.log(`Student's country code: ${student.country}`);
    if (student) {
      for (var [code, name] of Object.entries(props.options)) {
        if (student.country === code) {
          console.log(
            `Found a match! Country code: ${code} = Student country code: ${student.country} !`
          );
          element_list.push(
            <SelectOption
              key={count}
              option_value={code}
              option_text={name}
              selected_flag={true}
            />
          );
        } else {
          element_list.push(
            <SelectOption key={count} option_value={code} option_text={name} />
          );
        }
        count += 1;
      }
    } else {
      for (var [code, name] of Object.entries(props.options)) {
        element_list.push(
          <SelectOption key={count} option_value={code} option_text={name} />
        );
        count += 1;
      }
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
      >
        {generate_options(props.student ?? null)}
      </select>
    </div>
  );
}
