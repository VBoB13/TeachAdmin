import React, { Component } from "react";
import { render } from "react-dom";

class TextField extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: "",
            label: "",
            value: "",
            placeholder: "Loading...",
            required: false,
            max_length: 256
        };
    }

    conponentDidMount(){
        
    }

    render(){
        return(
            <input 
                type="text"
                placeholder={this.props.placeholder} 
                 />
        );
    }
}

export default TextField;