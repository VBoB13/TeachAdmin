import React, { Component } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

import LoginMessage from "../accounts/messages/LoginMessage";
import LinkCard from "../cards/cards";

export default function HomePage(props) {
  return (
    <main className="link-container">
      <section className="link-slot">
        <Link to="/account/">
          <LinkCard
            title="Who am I?"
            logo="/static/frontend/svg/working_girl.svg"
            img_alt="Teacher Working"
            text="Account Information"
          />
        </Link>
      </section>
      <section className="link-slot">
        <Link to="/students/">
          <LinkCard
            title="Students"
            logo="/static/frontend/svg/red_beard_avatar.svg"
            img_alt="Bearded Student"
            text="Shows all your students"
          />
        </Link>
      </section>
    </main>
  );
}
