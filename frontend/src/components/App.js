import React, { Component } from "react";
import { render } from "react-dom";

import Accounts from "./Accounts";

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container-fluid">
                <Accounts />
            </div>    
        );
    }
}

export default App;