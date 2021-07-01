import React from "react";
import TabSection from "./TabSection";
import { 
  isResponseOK,
  login } from "../../helpers/auth";

export default function Authenticate(props) {
    return (
      <div className="container bg-secondary rounded p-3">
        <TabSection />
      </div>
    );
}