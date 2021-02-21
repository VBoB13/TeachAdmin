import React, { Component } from "react";
import { render } from "react-dom";

class LoginMessage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.error){
            return (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                <strong>{this.props.error}</strong>
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            );
        }
        return (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{this.props.message}</strong>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        );
        
    }
}

export default LoginMessage;