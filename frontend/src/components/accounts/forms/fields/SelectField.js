import React from "react";

export function SelectOption(props) {
  return (
    <option value={`${props.option_value}`}>{`${props.option_text}`}</option>
  );
}

export default function SelectField(props) {
  const generate_country_option = (country_array, index) => {
    return (
      <option
        key={index}
        value={`${country_array[0]}`}
      >{`${country_array[1]}`}</option>
    );
  };

  const generate_options = () => {
    let element_list = props.options.map((country_array, index) => {
      return generate_country_option(country_array, index);
    });
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
