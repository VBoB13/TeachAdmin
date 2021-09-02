import React, { Component } from "react";
import { render } from "react-dom";

export default function EditForm(props) {
  console.log(props.data);
  generateForm = (data) => {
    return Object.keys(data).length;
  };
  formSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={formSubmit}>
      {generateForm()}
      <input type="submit" value="Submit" className="btn btn-primary" />
    </form>
  );
}
