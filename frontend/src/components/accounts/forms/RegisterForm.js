import React, { Component } from "react";
import { render } from "react-dom";

class RegisterForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            data_loaded: false,
            form_data: {}
        }

        this.loadFieldComponents = this.loadFieldComponents.bind(this);
        this.constructFields = this.constructFields.bind(this);
    }



    constructFields(fieldName, fieldData){
        /* Idea behind this function is to simply take each of the
        fields and assign them to a suitable component that will
        then be rendered accordingly.
        
        PARAMS: fieldName (str), fieldData (JSON)
        OUTPUT: < InputComponent />
        */
      
    }

    loadFieldComponents(data){
        /* Method for simply checking so that the JSON object recieved from
          the server actually contains the objects "fields".
          If such object exists, we simply set the state of this component's
          'data_loaded' to true (boolean) to control the rendering.

          INPUT: data (JSON)
          OUTPUT: ---
         */
      // Checking so that the JSON object has the subsequent "fields" Object
      if(data.hasOwnProperty("fields")){
        this.setState({
          data_loaded: true,
          form_data: data["fields"]
        });
      } else{
          throw TypeError(
            "JSON response does not contain property 'fields'.");
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
            console.log(err);
          });
    }

    render(){
      if(this.state.data_loaded === true){
        console.log(`\nComponent's state.form_data: \n${this.state.form_data}`);
        return <h1 className="display-4">LOADED!</h1>;
      } else {
        return <h1 className="display-4">Wait...</h1>;
      }
    }
}

export default RegisterForm;