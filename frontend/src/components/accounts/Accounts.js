import React, { Component } from "react";
import { render } from "react-dom";

import axios from "axios";
import Authenticator from "../../helpers/auth";
import { isResponseOK } from "../../helpers/auth";

import EditForm from "./forms/EditAccount";
import ToggleCheckBox from "../togglers/toggleCheckbox";

class Accounts extends Component {
  constructor(props) {
    super(props);

    // Registering component's methods
    this.load_stylesheet = this.load_stylesheet.bind(this);
    this.whoami = this.whoami.bind(this);
    this.generateUserData = this.generateUserData.bind(this);
    this.generateUserRelatedData = this.generateUserRelatedData.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);

    this.state = {
      loaded: false,
      data: null,
      placeholder: "Now loading, please wait...",
      edit: false,
    };
  }

  async componentDidMount() {
    let data;
    try {
      data = await this.whoami();
    } catch (err) {
      console.log(`Error: ${err.message}`);
      this.setState({
        loaded: false,
        data: null,
        placeholder: "Error! Could not get data from server.",
      });
    }
    let state_data = {
      loaded: true,
      data: data,
      placeholder: "",
    };
    this.setState(state_data);
  }

  load_stylesheet() {
    return (
      <link
        rel="stylesheet"
        type="text/css"
        href="/static/frontend/css/accounts.css"
      />
    );
  }

  whoami() {
    let data_obj = new Authenticator("/accounts/me/");
    let data = data_obj.whoami();
    return data;
  }

  generateUserData() {
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
              {career_profile.slice(0, 25)}...
            </a>
          </dd>
          <dt>Member since:</dt>
          <dd>{date_joined}</dd>
        </dl>
      </section>
    );
  }

  generateUserRelatedData() {
    let user = this.state.data.user;
    return <h1 className="display-4">{user}</h1>;
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <main className="content_section">
          <div className="row justify-content-center">
            <h1 className="display-4">{this.state.placeholder}</h1>
          </div>
          {this.load_stylesheet()}
        </main>
      );
    }
    if (this.state.loaded && this.state.edit) {
      return (
        <main className="content_section">
          <div className="row justify-content-center align-items-center">
            <div className="col-7">{this.generateUserRelatedData()}</div>
            <div className="col-5">
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
          {this.load_stylesheet()}
        </main>
      );
    }
    return (
      <main className="content_section">
        <div className="row justify-content-center align-items-center">
          <div className="col-7">{this.generateUserRelatedData()}</div>
          <div className="col-5">
            <ToggleCheckBox
              toggleEdit={this.toggleEdit}
              stateEdit={this.state.edit}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">{this.generateUserData()}</div>
        </div>
        {this.load_stylesheet()}
      </main>
    );
  }
}

export default Accounts;
