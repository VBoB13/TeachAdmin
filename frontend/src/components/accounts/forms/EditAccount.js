import React, { Component } from "react";
import { render } from "react-dom";
import TextField from "./fields/TextField";

function generateForm(data) {
  return (
    <TextField
      id="career_profile"
      fieldname="Career URL"
      init_value={data.career_profile}
    />
  );
}

function formSubmit(e) {
  e.preventDefault();
}

export default function EditForm(props) {
  return (
    <form onSubmit={formSubmit}>
      {generateForm(props.data)}
      <input type="submit" value="Submit" className="btn btn-primary" />
    </form>
  );
}
