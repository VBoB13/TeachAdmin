import React, { Component } from "react";
import { render } from "react-dom";

class RegisterForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            data_loaded: false,
            form_loaded: false
        }

        this.formFieldStructure = this.formFieldStructure.bind(this);
        this.constructForm = this.constructForm.bind(this);
    }

    constructForm(formFields){
        /* Idea behind this function is to simply take each of the
        fields and assign them to a suitable component that will
        then be rendered accordingly.
        
        PARAMS: formFields (JSON)
        OUTPUT: */
        
        var field_check = {
          username: {
            type: "text",
            name: "Username",
            value: "",
          },
          password: {
            type: "password",
            name: "Password",
            value: "",
          },
          email: {
            type: "email",
            name: "Email",
            value: "",
          },
          first_name: {
            type: "text",
            name: "First name",
            value: "",
          },
          last_name: {
            type: "text",
            name: "Last name",
            value: "",
          },
          country: {
              type: "select",
              choices: formFields.country_choices,
              
          },
          career_profile: {
              type: "url",
              name: "Career profile (URL)",
              value: ""
          }
        };

        const textField_list = [
          "username",
          "password",
          "email",
          "first_name",
          "last_name",
        ];
        const urlField = "career_profile";
        const country_data = {
          field_name: "country",
          choices: formFields.country_choices,
        };
        for (var [key, value] of Object.entries(formFields)) {
            let field_name = `${key[0]}`.toUpperCase() + `${key}`.slice(1);
          if (textField_list.includes(key) && value === "") {
            var new_value = {
              type: "text",
              name: `${field_name}`,
              value: `${value}`,
            };
            console.log(`Field: ${new_value.name}`);
            console.log(`Type: ${new_value.type}`);
            console.log(`Value: ${new_value.value}`);
          } else if (key === urlField) {

          }
        }
    }

    formFieldStructure(data){
        /* Method for contructing the register form in a nice way.
         As the serializer automatically puts the Teacher-fields
         within another layer of object structure, I loop through
         the fields to generate a single-layer JSON-object with
         all the fields. 
         
         PARAM: data (JSONResponse)
         OUTPUT: formFields (JSON-Object)
         */

        let formFields = {};
        console.log(data);
        // Making sure the 'country choices' object was received
        if(data.country_choices){
            // Throwing all the country options into its own [key:value] pair
            formFields.country_choices = data.country_choices;
        }
        // Iterating through the 'fields' json-object's keys
        for (var key of Object.keys(data.fields)) {
          console.log(`${key}: ${data.fields[key]} (${typeof data.fields[key]})`);
          if (typeof data.fields[key] === "object") {
            // For scoping reasons, I save the object into another object  
            var teacher_obj = data.fields[key];
            // Looping through the teacher-object's properties
            for (var teacher_key of Object.keys(teacher_obj)) {
                let field_value;
                if(teacher_obj[teacher_key] == null){
                    field_value = "";
                } else {
                    field_value = teacher_obj[teacher_key];
                }
              console.log(`${teacher_key}: ${field_value}`);
              // Adding the [key,value] pair into formField json
              formFields[`${teacher_key}`] = field_value;
            }
          } else {
            formFields[`${key}`] = data.fields[key];
          }
        }
        // Log the results
        console.log(formFields);
        // Returning the formFields as one object where
        return formFields;
    }

    componentDidMount(){
        fetch("/accounts/register/", {
          credentials: "same-origin",
        })
          // Using App's isResponseOK method (data=>json())
          .then(this.props.isResponseOK)
          // Re-structuring the JSON object for convenience
          .then(this.formFieldStructure)
          // Putting re-structured data into its respective components
          .then(this.constructForm)
          .catch((err) => {
            console.log(err);
          });
    }

    render(){
        return(
            <h1 className="display-4">Heya!</h1>
        )
    }
}

export default RegisterForm;