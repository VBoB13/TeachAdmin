import React from "react";
import { Link } from "react-router-dom";

import Slogan from "./Slogan";
import SubSlogan from "./SubSlogan";
import HowItWorksButton from "./HowItWorks";
import GuyWithCat from "./GuyWithCat";

export default function GuestHome(props){
    return(
        <main className="container-guesthome-main">
            <Slogan />
            <SubSlogan />
            <HowItWorksButton />
            <GuyWithCat />
        </main>
    );
}