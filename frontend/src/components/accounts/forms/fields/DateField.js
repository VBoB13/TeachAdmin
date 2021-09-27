import React from "react";

import InputField from "./InputField";

export default class DateField extends InputField {
  constructor(props) {
    super(props);
    this.state.fieldtype = "date";
  }

  handleChange(event) {
    event.preventDefault();
    const chosen_date = new Date(event.target.value);
    var date_str = chosen_date.toISOString().split("T")[0];
    console.log(date_str);

    this.setState({ value: date_str });
  }
}
