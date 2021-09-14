import React, { Component } from "react";
import { render } from "react-dom";

function generateForm(data) {
  return Object.keys(data).length;
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
