import React, { Component } from "react";
import { render } from "react-dom";

import EditForm from "./forms/EditAccount";
import ToggleCheckBox from "../togglers/toggleCheckbox";

import { isResponseOK } from "../../helpers/auth";

class Accounts extends Component{
  constructor(props){
    super(props);

    // Registering component's methods
    this.whoami = this.whoami.bind(this);
    this.generateUserData = this.generateUserData.bind(this);
    this.generateUserRelatedData = this.generateUserRelatedData.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);

    this.state = {
        loaded: false,
        data: null,
        placeholder: "Now loading, please wait...",
        edit: false
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
    .then(isResponseOK)
    .then((data) => {
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
    let country = this.state.data.country.name;
    let country_code = this.state.data.country.code;
    let career_profile = this.state.data.career_profile;
    let date_joined = this.state.data.date_joined;

    return (
      <section className="user-info rounded p-2">
        <dl>
          <dt>Country</dt>
          <dd>
            {country} ({country_code})
          </dd>
          <dt>Career URL</dt>
          <dd>
            <a href={career_profile} target="_blank">
              {career_profile}
            </a>
          </dd>
          <dt>Member since:</dt>
          <dd>{date_joined}</dd>
        </dl>
      </section>
    );
  }

  generateUserRelatedData(){
    let user = this.state.data.user;

    return(
        <h1 className="display-4">
            {user}
        </h1>
    );
  }

  toggleEdit(){
    this.setState({edit: !this.state.edit});
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
    if(this.state.loaded && this.state.edit){
      return (
        <div className="content_section">
          <div className="row align-items-center">
            <div className="col-4">{this.generateUserRelatedData()}</div>
            <div className="col-8">
              <ToggleCheckBox
                toggleEdit={this.toggleEdit}
                stateEdit={this.state.edit}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <EditForm data={this.state.data} />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="content_section">
        <div className="row align-items-center">
          <div className="col-4">{this.generateUserRelatedData()}</div>
          <div className="col-8">
            <ToggleCheckBox
              toggleEdit={this.toggleEdit}
              stateEdit={this.state.edit}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">{this.generateUserData()}</div>
        </div>
      </div>
    );
  }
}

export default Accounts;