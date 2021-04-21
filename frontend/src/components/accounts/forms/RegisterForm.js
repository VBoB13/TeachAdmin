import React, { Component } from "react";
import { render } from "react-dom";
import parse, { attributesToProps, domToReact } from 'html-react-parser';

class RegisterForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            data_loaded: false,
            form: ""
        }

        this.loadFieldComponents = this.loadFieldComponents.bind(this);
        this.buildForm = this.buildForm.bind(this);
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
      return form;
    }

    loadFieldComponents(data){
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
        .then(this.loadFieldComponents)
        // Catching any errors
        .catch((err) => {
          console.error(err);
        });
    }

    render(){
      if(this.state.data_loaded === true){
        return (
          <div>
            <h1 className="display-4 m-3">Register</h1>
            <form className="rounded" action="/accounts/register/" method="post">
              {this.buildForm()}
            </form>
          </div>
        );
      }
      return <h1 className="display-4">Wait...</h1>;
    }
}

export default RegisterForm;