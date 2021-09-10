import React, { Component } from "react";
import parse, { attributesToProps, domToReact } from "html-react-parser";

import Authenticator, { isResponseOK } from "../../../helpers/auth";

import FormError from "./errors/FormError";
import ErrorList from "./errors/ErrorList";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data_loaded: false,
      form: "",
      errors: {},
    };

    this.loadForm = this.loadForm.bind(this);
    this.buildForm = this.buildForm.bind(this);
    this.retrieveFormData = this.retrieveFormData.bind(this);
    this.register = this.register.bind(this);
    this.loadMessages = this.loadMessages.bind(this);
    this.loadErrors = this.loadErrors.bind(this);
  }

  retrieveFormData() {
    let registerForm = document.getElementById("registerForm");
    let formInputs = registerForm.elements;
    let teacher = {};
    let formDataManual = {};
    for (var i = 0; i < formInputs.length; i++) {
      if (
        formInputs[i].nodeName === "INPUT" ||
        formInputs[i].nodeName === "SELECT"
      ) {
        if (formInputs[i].type != "submit") {
          var fieldNameSplit = formInputs[i].name.split(".");
          if (fieldNameSplit.length === 1) {
            formDataManual[`${formInputs[i].name}`] = formInputs[i].value;
          } else {
            teacher[`${fieldNameSplit[1]}`] = formInputs[i].value;
          }
        }
      }
    }
    formDataManual["teacher"] = teacher;
    return formDataManual;
  }

  loadErrors(errs) {
    console.log({ Errors: errs });
    if (typeof errs === "object") {
      this.setState({
        errors: errs,
      });
    }
  }

  loadMessages(jsonObj) {
    if (jsonObj.hasOwnProperty("errors")) this.loadErrors(jsonObj["errors"]);
  }

  async register(e) {
    e.preventDefault();
    let formData = this.retrieveFormData();
    let auth_obj = new Authenticator("/accounts/register/", "POST");
    auth_obj.request_conf["data"] = JSON.stringify(formData);
    let data = await auth_obj.register();
    this.loadMessages(data);
  }

  buildForm() {
    /* 
    Utilizes the module 'html-react-parser' to convert the response's
    "form" (str) into React Elements with some options.

    PARAMS: none
    OUTPUT: HTML (parse(HTML-string, options))
    */

    // Options for the parser
    const options = {
      replace: ({ name, attribs, children }) => {
        if (!attribs) return;
        if (name === "legend") {
          return <small />;
        }
        /*
        This block checks for:
        1. For 'input' elements so that the standard attribute
          'value' can be updated to 'defaultValue' so that
          React can render the element with automatic onChange-handlers
        */
        if (name === "input" && attribs.hasOwnProperty("value")) {
          attribs.defaultValue = attribs.value;
          if (attribs.hasOwnProperty("defaultValue")) delete attribs.value;
          if (attribs.name === "password" && attribs.type === "text") {
            attribs.type = "password";
          }

          if (attribs.name in this.state.errors) {
            if (!attribs.hasOwnProperty("autofocus")) {
              attribs.autofocus = true;
            }
            const props = attributesToProps(attribs);
            return (
              <div className="errorField">
                <input {...props} />
                <ErrorList errors={this.state.errors[`${attribs.name}`]} />
              </div>
            );
          }
          const props = attributesToProps(attribs);
          return <input {...props} />;
        }
        if (name === "span" && attribs.class === "help-block") {
          const props = attributesToProps(attribs);
          return <small {...props}>{domToReact(children, options)}</small>;
        }
        if (name === "form") {
          if (name in Object.keys(this.state.errors)) {
            const props = attributesToProps(attribs);
            return (
              <form {...props}>
                <FormError errorText={this.state.errors["form"]} />
                {domToReact(children, options)}
              </form>
            );
          }
        }
      },
      trim: true,
    };
    // Parse through form to generate HTML
    let form = parse(this.state.form, options);
    return form;
  }

  loadForm(data) {
    /* 
    Method for simply checking so that the JSON object recieved from
    the server actually contains the objects "form".
    If such object exists, we simply set the state of this component's
    'data_loaded' to true (boolean) to control the rendering.

    INPUT: data (JSON)
    OUTPUT: ---
    */
    // Checking so that the JSON object has the subsequent "form" Object
    if (data.hasOwnProperty("form")) {
      this.setState({
        data_loaded: true,
        form: data["form"],
      });
      // If no 'form' property is found, a ReferenceError is thrown.
    } else {
      throw ReferenceError(
        "JSON response does not contain property 'fields' or 'form'."
      );
    }
  }

  async componentDidMount() {
    let auth_obj = new Authenticator("/accounts/register/");
    let data = await auth_obj.register_get_form();
    this.loadForm(data);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.errors !== prevState.errors) this.buildForm();
  }

  render() {
    if (this.state.data_loaded === true) {
      return (
        <div>
          <form id="registerForm" className="rounded" onSubmit={this.register}>
            {this.buildForm()}
            <input type="submit" className="btn btn-primary" value="Register" />
          </form>
        </div>
      );
    }
    return <h1 className="display-4">Wait...</h1>;
  }
}
