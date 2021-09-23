import React, { Component, useState } from "react";
import { render } from "react-dom";
import TextField from "./fields/TextField";
import { RequestHandler } from "../../../helpers/auth";

class Account extends RequestHandler {
  constructor(url, method = "GET", contentType = "application/json") {
    super(url, method, contentType);
    let career_profile = document.getElementById("career_profile").value;
    this.request_conf["data"] = {
      career_profile: career_profile,
    };
  }
}

function generateForm(data) {
  return (
    <TextField
      id="career_profile"
      fieldname="Career URL"
      init_value={data.career_profile}
      autoFocus
    />
  );
}

function sendData() {
  var accObj = new Account("/accounts/me/", "PUT");
  let data = accObj.sendRequest();
  return data;
}

export default function EditForm(props) {
  const [data, setData] = useState(props.data);

  function formSubmit(e) {
    e.preventDefault();
    setData(sendData());
    props.updateInfo();
    let getButton = document.querySelector("input[type='radio']#get");
    getButton.click();
  }

  return (
    <div className="form-content">
      <form onSubmit={formSubmit}>
        {generateForm(data)}
        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
    </div>
  );
}
