import React, { Component, useContext } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

import LoginMessage from "../accounts/messages/LoginMessage";
import { TeacherContext } from "../App";
import LinkCard from "../cards/cards";

export default function HomePage(props) {
  const teacher = useContext(TeacherContext);
  return (
    <main className="link-container">
      <section className="link-slot">
        <Link to="/account/">
          <LinkCard
            title={`${teacher.user}`}
            logo="/static/frontend/svg/working_girl.svg"
            img_alt="Teacher Working"
            text="Account Information"
          />
        </Link>
      </section>
      <section className="link-slot">
        <Link to="/students">
          <LinkCard
            title="Students"
            logo="/static/frontend/svg/red_beard_avatar.svg"
            img_alt="Bearded Student"
            text="Shows your students"
          />
        </Link>
      </section>
      <section className="link-slot">
        <Link to="/courses">
          <LinkCard
            title="Courses"
            logo="/static/frontend/svg/teaching_guy.svg"
            img_alt="Teacher"
            text="Shows your Courses"
          />
        </Link>
      </section>
      <section className="link-slot">
        <Link to="/courses">
          <LinkCard
            title="Courses"
            logo="/static/frontend/svg/teaching_guy.svg"
            img_alt="Teacher in Classroom"
            text="Shows all your courses"
          />
          {/* TWEAK THESE */}
        </Link>
      </section>
    </main>
  );
}
