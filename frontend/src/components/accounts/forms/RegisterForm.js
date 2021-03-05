import React, { Component } from "react";
import { render } from "react-dom";

class RegisterForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            loaded: false,
            formFields: {}
        }
    }

    componentDidMount(){
        fetch("/accounts/register/", {
            credentials: "same-origin"
        })
        .then(this.props.isResponseOK)
        .then((data) => {
            for (let key in data) {
              if (data.hasOwnProperty(key)) {
                console.log(`${key}: ${data[key]}`);
                if (typeof data[key] == 'object'){
                    for (let teacher_key in data[key]){
                        console.log(`${data[key]}: ${data[key][teacher_key]}`);
                    }
                }
              }
            }
        })
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