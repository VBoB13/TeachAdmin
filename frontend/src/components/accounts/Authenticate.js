import React from "react";
import TabSection from "./TabSection";

export default function Authenticate(props) {
    return (
      <div className="container bg-secondary m-3 p-3">
        <TabSection login={props.login} error={props.error} />
      </div>
    );
}