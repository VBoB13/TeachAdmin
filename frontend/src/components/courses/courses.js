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
    alert("Submitted!");
  };
  return (
    <div className="form-content">
      <form onSubmit={createStudent} className="rounded">
        <TextField id="course_name" fieldname="course_name" />
        <NumberField id="course_grade" fieldname="course_grade" />
        <DateField
          id="course_start_date"
          fieldname="course_start_date"
          init_value={today.toISOString().split("T")[0]}
        />
        <DateField
          id="course_end_date"
          fieldname="course_end_date"
          init_value={
            new Date(today.getFullYear() + 1).toISOString().split("T")[0]
          }
        />
        <HiddenTeacherField />
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
        return course.to_list_item();
      });
    }
    return;
  };

  if (!courses) {
    return <h1 className="loading">Loading...</h1>;
  }

  console.log("Courses:", courses);
  return (
    <Switch>
      <main className="content-section">
        <Route path={`${match.path}/`}>
          <CourseList>{emptyListOrNot()}</CourseList>
          <Link to={`${match.path}/new/`}>Add new course?</Link>
        </Route>
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
      </main>
    </Switch>
  );
}
