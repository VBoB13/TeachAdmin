import React, { Component } from "react";
import { render } from "react-dom";
import parse, { attributesToProps, domToReact } from 'html-react-parser';

import ErrorList from "./errors/ErrorList";

import Cookies from "universal-cookie";
const cookies = new Cookies();

class RegisterForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            data_loaded: false,
            form: "",
            errors: {}
        }

        this.loadForm = this.loadForm.bind(this);
        this.buildForm = this.buildForm.bind(this);
        this.retrieveFormData = this.retrieveFormData.bind(this);
        this.register = this.register.bind(this);
        this.loadMessages = this.loadMessages.bind(this);
        this.loadErrors = this.loadErrors.bind(this);
    }

    retrieveFormData(){
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

    loadErrors(errs){
      if(typeof(errs) === "object"){
        this.setState({
          errors: errs["errors"]
        });
      }
    }

    loadMessages(jsonObj){
      if(jsonObj.hasOwnProperty("errors")) this.loadErrors(jsonObj);
    }

    register(e){
      e.preventDefault();
      let formData = this.retrieveFormData();
      fetch("/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": cookies.get("csrftoken"),
        },
        credentials: "same-origin",
        body: JSON.stringify(formData),
      })
        .then(this.props.isResponseOK)
        .catch((err) => {
          console.error(err);
        })
        .then(this.loadMessages);
    }

    buildForm(){
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
              if(!attribs.hasOwnProperty("autofocus")) {
                attribs.autofocus = true;
              }
              const props = attributesToProps(attribs);
              return (
                <div className="errorField">
                  <input {...props} />
                  <ErrorList 
                    errors={this.state.errors[`${attribs.name}`]} 
                    />
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
        },
        trim: true,
      };
      
      let form = parse(this.state.form, options);
      console.log(form, typeof(form));

      return form;
    }

    loadForm(data){
      /* 
      Method for simply checking so that the JSON object recieved from
      the server actually contains the objects "form".
      If such object exists, we simply set the state of this component's
      'data_loaded' to true (boolean) to control the rendering.

      INPUT: data (JSON)
      OUTPUT: ---
      */
      // Checking so that the JSON object has the subsequent "form" Object
      if(data.hasOwnProperty("form")){
        this.setState({
          data_loaded: true,
          form: data["form"]
        });
      // If no 'form' property is found, a TypeError is thrown.
      } else {
          throw ReferenceError(
            "JSON response does not contain property 'fields' or 'form'."
          );
      }
    }

    componentDidMount(){
      fetch("/accounts/register/", {
        credentials: "same-origin",
      })
        // Using App's isResponseOK method (data=>json())
        .then(this.props.isResponseOK)
        // Re-structuring the JSON object for convenience
        .then(this.loadForm)
        // Catching any errors
        .catch((err) => {
          console.error(err);
        });
    }

    componentDidUpdate(prevProps, prevState){
      if(this.state.errors !== prevState.errors) this.buildForm();
    }

    render(){
      if(this.state.data_loaded === true){
        return (
          <div>
            <h1 className="display-4 m-3">Register</h1>
            <form
              id="registerForm"
              className="rounded"
              onSubmit={this.register}
            >
              {this.buildForm()}
              <input 
                type="submit" 
                className="btn btn-primary" 
                value="Register" />
            </form>
          </div>
        );
      }
      return <h1 className="display-4">Wait...</h1>;
    }
}

export default RegisterForm;