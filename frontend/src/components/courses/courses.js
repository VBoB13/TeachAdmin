import React, { useState, useRef, useEffect } from "react";
import { Switch, Route, useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

import { RequestHandler } from "../../helpers/auth";
import TextField from "../accounts/forms/fields/TextField";
import DateField from "../accounts/forms/fields/DateField";
import NumberField from "../accounts/forms/fields/NumberField";
import HiddenTeacherField from "../accounts/forms/fields/HiddenTeacher";
import Course, { getCourses } from "./logic";

export function CourseList(props) {
  return <section className="course-list">{props.children}</section>;
}

export function CourseForm(props) {
  const today = new Date();
  const createStudent = async (e) => {
    e.preventDefault();
    console.log("Submitted!");
    let name = document.getElementById("course_name").value;
    let grade = document.getElementById("course_grade").value;
    let start_date = document.getElementById("course_start_date").value;
    let end_date = document.getElementById("course_end_date").value;
    let teacher = document.getElementById("teacher_id").value;
    let students = [];

    let new_course = new Course({
      name,
      grade,
      start_date,
      end_date,
      teacher,
      students,
    }).to_new_course();

    let reqObj = new RequestHandler("/courses/all/", "POST");
    reqObj.request_conf["data"] = new_course;

    try {
      var course_data = await reqObj.sendRequest();
      var created_course = new Course(course_data);
    } catch (error) {
      console.log("Could not add student!");
      console.error(error);
      console.log("You will be redirected on a second...");
      setTimeout(() => {
        location.replace("/courses/");
      }, 10000);
    }
    console.log(`Successfully added: \n${created_course}`);
    console.log(created_course);
    setTimeout(() => {
      location.replace("/courses/");
    }, 1000);
  };
  return (
    <div className="form-content">
      <form onSubmit={createStudent} className="rounded">
        <TextField
          id="course_name"
          fieldname="course_name"
          help_text="Anything within 50 characters."
        />
        <NumberField
          id="course_grade"
          fieldname="course_grade"
          help_text="Numbers only."
        />
        <DateField
          id="course_start_date"
          fieldname="course_start_date"
          init_value={today.toISOString().split("T")[0]}
          help_text="Pick date OR type date in initial format."
        />
        <DateField
          id="course_end_date"
          fieldname="course_end_date"
          init_value={
            new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
              .toISOString()
              .split("T")[0]
          }
        />
        <HiddenTeacherField />
        <button type="submit" className="standard-button">
          Add Course
        </button>
        <button
          className="standard-button-cancel"
          onClick={() => {
            history.back();
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default function Courses(props) {
  let match = useRouteMatch();
  const [courses, setCourses] = useState(null);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(
          response.courses.map((course) => {
            return new Course(course);
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  const emptyListOrNot = () => {
    if (courses.length >= 0) {
      return courses.map((course) => {
        return course.to_list_component();
      });
    }
    return;
  };

  if (!courses) {
    return <h1 className="loading">Loading...</h1>;
  }

  console.log("Courses:", courses);
  console.log(`${match.path}`);
  return (
    <Switch>
      <main className="content-section">
        <Route path={`${match.path}/new/`}>
          <CourseForm />
        </Route>
        <Route path={`${match.path}/edit/`}>
          {/* Currently thinking something like
              <CourseDetail course={courses[i]} />
              Alternatively, I could use a useRef(courses[i])
              which would then be the context in which
            <CourseDetail /> opens. */}
        </Route>
        <Route path={`${match.path}/`}>
          <CourseList>{emptyListOrNot()}</CourseList>
          <Link to={`${match.path}/new/`}>Add new course?</Link>
        </Route>
      </main>
    </Switch>
  );
}
