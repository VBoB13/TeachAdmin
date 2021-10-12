import React from "react";
import InputField from "./InputField";

export default class NumberField extends InputField {
  constructor(props) {
    super(props);
    this.state.fieldtype = "number";
  }
}
