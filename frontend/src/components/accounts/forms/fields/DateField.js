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
    const today = new Date();

    // If the chosen date is before today
    if (
      today.getFullYear() > chosen_date.getFullYear() ||
      (today.getFullYear() === chosen_date.getFullYear() &&
        today.getMonth() > chosen_date.getMonth()) ||
      (today.getFullYear() === chosen_date.getFullYear() &&
        today.getMonth() === chosen_date.getMonth() &&
        today.getDate() > chosen_date.getDate())
    ) {
      if (chosen_date.getMonth() + 1 < 10) {
        this.setState({
          value: `${chosen_date.getFullYear()}-0${
            chosen_date.getMonth() + 1
          }-${chosen_date.getDate()}`,
        });
      } else {
        this.setState({
          value: `${chosen_date.getFullYear()}-${
            chosen_date.getMonth() + 1
          }-${chosen_date.getDate()}`,
        });
      }
    } else {
      if (today.getMonth() + 1 < 10) {
        this.setState({
          value: `${today.getFullYear()}-0${
            today.getMonth() + 1
          }-${today.getDate()}`,
        });
      } else {
        this.setState({
          value: `${today.getFullYear()}-${
            today.getMonth() + 1
          }-${today.getDate()}`,
        });
      }
    }
  }
}
