import React from "react";
import { Link } from "react-router-dom";

import Slogan from "./Slogan";
import SubSlogan from "./SubSlogan";

export default function GuestHome(props){
    return(
        <main className="container-guesthome-main">
            <Slogan />
            <SubSlogan />
        </main>
    );
}