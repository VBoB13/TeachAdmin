import React, { Component } from "react";
import { render } from "react-dom";


class Accounts extends Component{
    constructor(props){
        super(props);

        // Registering component's methods
        this.whoami = this.whoami.bind(this);
        this.generateUserData = this.generateUserData.bind(this);

        this.state = {
            loaded: false,
            data: null,
            placeholder: "Now loading, please wait..."
        };
    }
    
    componentDidMount(){
        this.whoami();
    }

    whoami(){
        fetch("/accounts/me/", {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("You're logged in as: " + data.user);
            this.setState({
                loaded: true,
                data: data,
                placeholder: ""
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    generateUserData(){
        let user = this.state.data.user;
        let country = this.state.data.country;
        let career_profile = this.state.data.career_profile;

        return(
            <ul>
                <li>Name: {user}</li>
                <li>Country: {country}</li>
                <li>Career URL: {career_profile}</li>
            </ul>
        );
    }

    render(){
        if(!this.state.loaded){
            return (
              <div className="content_section">
                <div className="row">
                  <h1 className="display-4">{this.state.placeholder}</h1>
                </div>
              </div>
            );
        }
        return(
            <div className="content_section">
                <div className="row">
                    {this.generateUserData()}
                </div>
            </div>
        );
    }
}

export default Accounts;