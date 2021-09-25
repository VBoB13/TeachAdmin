import React, { useState } from "react";
import { Link } from "react-router-dom";

function BaseCard(props) {
  return <div className="card-base">{props.children}</div>;
}

export default function LinkCard(props) {
  return (
    <BaseCard>
      <div className="card-titlebox">{props.title}</div>
      <img src={props.logo} alt={props.img_alt} className="card-logo" />
      <div className="card-textbox">
        <span className="card-text">{props.text}</span>
      </div>
    </BaseCard>
  );
}

export function DataCard(props) {
  return (
    <BaseCard>
      <div className="card-titlebox">{props.number}</div>
      <div className="card-textbox">
        <span className="card-text">{props.text}</span>
      </div>
    </BaseCard>
  );
}
