import React from "react";

import Footer from "../footer/Footer";

export default function About(props) {
  return (
    <div className="row py-2">
      <main className="container-main">
        <h1 className="slogan">TeachAdmin</h1>
        <p className="longer-text">
          A website that is&nbsp;
          <em>
            <span className="title-underline">
              a tool for teachers to observe, analyze and manage their student's
              progress
            </span>
          </em>
          &nbsp;through various score data such as exams, assignments, tests and
          homeworks. It will be kept simple at first and gradually build up more
          advanced and (hopefully) even more useful functionalities.
        </p>
        <h1 className="slogan">The Story</h1>
        <p className="longer-text">
          It all started as I was simply helping my wife sorting out her
          students' test, homework and exam data and generating comments (that
          they have to provide to each student's parents by the end of the
          year). Teachers already have <strong>VERY</strong> extensive
          responsibilities and its often even more difficult for them to also
          have the time for analyzing the progress of each individual student.
          The core idea behind this project is to make teachers able to explore
          the data they put in about their students, thus enabling the teachers
          to observe, analyze and manage their students' learning progress
          through the course of time. While the main functionality is to simply
          provide visual graphs generated with the students score data, thus
          allowing teachers to quickly get an overview of the progress of the
          students, the system will also be able to eventually point out which
          students struggle in particular when compared to other students in the
          same subject etc. Machine learning will most likely end up being used
          to figure out patterns in the data that could provide teachers with
          hints about these things.
        </p>
      </main>
    </div>
  );
}
