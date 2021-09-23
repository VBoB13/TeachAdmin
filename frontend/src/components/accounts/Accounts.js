import React, { Component } from "react";
import { render } from "react-dom";


class Accounts extends Component{
    constructor(props){
        super(props);

        // Registering component's methods
        this.whoami = this.whoami.bind(this);
        this.generateUserData = this.generateUserData.bind(this);
        this.generateUserRelatedData = this.generateUserRelatedData.bind(this);

        this.state = {
            loaded: false,
            data: null,
            placeholder: "Now loading, please wait..."
        };
    }
    
    componentDidMount(){
        this.whoami();
    }

<<<<<<< Updated upstream
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
||||||| merged common ancestors
  updateInfo() {
    let data = this.whoami();
    this.setState(data);
  }
=======
  async updateInfo() {
    let data = await this.whoami();
    this.setState(data);
  }
>>>>>>> Stashed changes

    generateUserData(){
        let user = this.state.data.user;
        let country = this.state.data.country.name;
        let country_code = this.state.data.country.code;
        let career_profile = this.state.data.career_profile;
        let date_joined = this.state.data.date_joined;

        return (
          <section className="user-info">
            <dl>
              <dt>Name</dt>
              <dd>{user}</dd>
              <dt>Country</dt>
              <dd>{country} ({country_code})</dd>
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
        return (
          <div className="content_section">
            <div className="row">
              <div className="col-4">
                  {this.generateUserData()}
              </div>
              <div className="col-8">
                  {this.generateUserRelatedData()}
              </div>
            </div>
          </div>
        );
    }
}

export default Accounts;