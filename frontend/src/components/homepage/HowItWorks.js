import React, { useState } from "react";
import { Link } from "react-router-dom";

import DocumentsIcon from "../icons/Documents";


export default function HowItWorksButton(){
  // Defining default values
  const mainBlue = "#0078E7";
  const mainPurple = "#4020FF";
  // Defining hooks
  const [color, setColor] = useState(mainBlue);

  return (
    <Link to="/about/">
      <button 
        onMouseOver={() => setColor(mainPurple)}
        onMouseLeave={() => setColor(mainBlue)}
        className="standard-button-purple">
        How it Works <DocumentsIcon color={color} />
      </button>
    </Link>
  );
}