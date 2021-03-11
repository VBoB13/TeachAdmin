import React, { Component } from "react";
import { render } from "react-dom";

class TextField extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: "",
            value: "",
        };
    }
}

export default TextField;