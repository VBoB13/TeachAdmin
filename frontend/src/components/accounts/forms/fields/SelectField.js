import React from "react";

export function SelectOption(props) {
  return (
    <option value={`${props.option_value}`}>{`${props.option_text}`}</option>
  );
}

export default function SelectField(props) {
  const generate_country_option = (code, name, count) => {
    return <option key={count} value={`${code}`}>{`${name}`}</option>;
  };

  const generate_options = () => {
    let element_list = [];
    let count = 1;
    for (var [code, name] of Object.entries(props.options)) {
      element_list.push(generate_country_option(code, name, count));
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
      >
        {generate_options()}
      </select>
    </div>
  );
}
