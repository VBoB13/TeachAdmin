import { Component } from "react";

import ToggleButton from "./ToggleButton";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";

export default class TabSection extends Component {
    constructor(props){
        super(props);
        this.state = {toggleView: true};

        // Bind component methods
        this.handleToggle = this.handleToggle.bind(this);
    }


    handleToggle(event){
        event.preventDefault();
        this.setState({
            toggleView: !this.state.toggleView
        });
    }

    render(){
        if(this.state.toggleView){
            return (
              <div>
                <ToggleButton 
                    onClick={this.handleToggle} 
                    value="Login" />
                <LoginForm />
              </div>
            );
        }
        return(
            <div>
                <ToggleButton 
                    onClick={this.handleToggle} 
                    value="Register" />
                <RegisterForm />
            </div>
        );
        
    }
}