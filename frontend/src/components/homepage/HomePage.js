import React, { Component } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

import LoginMessage from "../accounts/messages/LoginMessage";
import LinkCard from "../cards/cards";

export default function HomePage(props) {
  return (
    <div className="container-fluid">
      <div className="row p-1 my-1 justify-content-center align-content-center align-items-center">
        <div className="col p-2">
          <Link to="/account/">
            <LinkCard
              title="Who am I?"
              logo="/static/frontend/svg/working_girl.svg"
              img_alt="Teacher Working"
              text="Account Information"
            />
          </Link>
        </div>
        <div className="col p-2">
          <Link to="/students/">
            <LinkCard
              title="Students"
              logo="/static/frontend/svg/red_beard_avatar.svg"
              img_alt="Bearded Student"
              text="Shows all your students"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
