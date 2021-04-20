import React from "react";
import TabSection from "./TabSection";

export default function Authenticate(props) {
    return <TabSection 
            isResponseOK={props.isResponseOK}
            login={props.login}
            error={props.error} />;
}