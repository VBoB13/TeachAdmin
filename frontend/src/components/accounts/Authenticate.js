import React from "react";
import TabSection from "./TabSection";

export default function Authenticate(props) {
    return (
      <div className="container bg-secondary rounded p-3">
        <TabSection
          isResponseOK={props.isResponseOK}
          login={props.login}
          error={props.error}
        />
      </div>
    );
}