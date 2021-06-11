import React from "react";
import { Link } from "react-router-dom";

import DocumentsIcon from "../icons/Documents";


export default function HowItWorksButton(props){
    return (
      <Link to="/about/">
        <button className="standard-button-purple">
          How it Works <DocumentsIcon />
        </button>
      </Link>
    );
}