import React, { Component } from "react";
import { render } from "react-dom";
import parse, { attributesToProps, domToReact } from "html-react-parser";

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
