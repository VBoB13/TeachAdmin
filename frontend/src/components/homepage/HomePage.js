import React, { Component } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

import LoginMessage from "../accounts/messages/LoginMessage";
import LinkCard from "../cards/cards";

function AccountLinkButton(props) {
  return (
    <LinkCard
      title="Who am I?"
      logo="/static/frontend/svg/working_girl.svg"
      img_alt="Teacher Working"
      text="Account Information"
    />
  );
}

function StudentsLinkButton(props) {
  return (
    <LinkCard
      title="Students"
      logo="/static/frontend/svg/red_beard_avatar.svg"
      img_alt="Bearded Student"
      text="Shows all your students"
    />
  );
}

export default function HomePage(props) {
  return (
    <div className="container-fluid">
      <div className="row p-1 my-1">
        <div className="col-6 p-2">
          <Link to="/account/">
            <AccountLinkButton />
          </Link>
        </div>
        <div className="col-6 p-2">
          <Link to="/students/">
            <StudentsLinkButton />
          </Link>
        </div>
      </div>
    </div>
  );
}
