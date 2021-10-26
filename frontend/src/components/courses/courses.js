import React, { useState, useRef, useEffect } from "react";
import { Switch, Route, useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

import { RequestHandler } from "../../helpers/auth";
import TextField from "../accounts/forms/fields/TextField";
import DateField from "../accounts/forms/fields/DateField";
import NumberField from "../accounts/forms/fields/NumberField";
import SelectField from "../accounts/forms/fields/SelectField";
import HiddenTeacherField from "../accounts/forms/fields/HiddenTeacher";
import Course, { CourseDetailItem, getCourses } from "./logic";

export const CourseDetailContext = React.createContext();

export function CourseList(props) {
  return <section className="course-list">{props.children}</section>;
}

export function CourseForm(props) {
  // Date for later use within form
  const today = new Date();

  // Setting course if a Course is passed as prop
  const course = props.course ?? null;

  // Function to create a course.
  const submitCourse = async (e) => {
    e.preventDefault();
    console.log("Submitted!");

    // Getting values from fields
    let name = document.getElementById("course_name").value;
    let grade = document.getElementById("course_grade").value;
    let start_date = document.getElementById("course_start_date").value;
    let end_date = document.getElementById("course_end_date").value;
    let teacher = document.getElementById("teacher_id").value;
    let students = [];

    // Putting those values into a Course object
    // which then gets converted to needed format with
    // the Course method 'to_new_course'
    let method = "POST";
    let url = "/courses/all/";
    if (course) {
      let id = document.getElementById("course_id").value;
      method = "PUT";
      url = `/courses/${id}/`;
      var course_update_or_new = new Course({
        id,
        name,
        grade,
        start_date,
        end_date,
        teacher,
        students,
      }).to_update_course();
    } else {
      var course_update_or_new = new Course({
        name,
        grade,
        start_date,
        end_date,
        teacher,
        students,
      }).to_new_course();
    }

    // Creating request object and adding data
    let reqObj = new RequestHandler(url, method);
    reqObj.request_conf["data"] = course_update_or_new;

    // Making async-call with try-catch block to
    // handle the request to add the course to the server
    try {
      var course_data = await reqObj.sendRequest();
      var created_course = new Course(course_data);
    } catch (error) {
      if (course) console.log("Could not update course!");
      else console.log("Could not add student!");
      console.error(error);
      console.log("You will be redirected on a second...");
      setTimeout(() => {
        location.replace("/courses/");
      }, 10000);
    }
    if (course) console.log(`Successfully edited: \n${created_course}`);
    else console.log(`Successfully added: \n${created_course}`);
    console.log(created_course);
    setTimeout(() => {
      location.replace("/courses/");
    }, 1000);
  };

  return (
    <div className="form-content">
      <form onSubmit={submitCourse} className="rounded">
        <input
          type="hidden"
          id="course_id"
          value={course ? course.id : undefined}
        />
        <TextField
          id="course_name"
          fieldname="course_name"
          init_value={course ? course.name : ""}
          help_text="Anything within 50 characters."
        />
        {/* INSERT SelectField for Subjects here! */}
        <NumberField
          id="course_grade"
          fieldname="course_grade"
          init_value={course ? course.grade : undefined}
          help_text="Numbers only."
        />
        <DateField
          id="course_start_date"
          fieldname="course_start_date"
          init_value={
            course ? course.start_date : today.toISOString().split("T")[0]
          }
          help_text="Pick date OR type date in initial format."
        />
        <DateField
          id="course_end_date"
          fieldname="course_end_date"
          init_value={
            course
              ? course.end_date
              : new Date(
                  today.getFullYear() + 1,
                  today.getMonth(),
                  today.getDate()
                )
                  .toISOString()
                  .split("T")[0]
          }
        />
        <HiddenTeacherField />
        <button type="submit" className="standard-button">
          {course ? "Edit" : "Add"} Course
        </button>
        <button
          type="button"
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

  if (courses === "undefined" || courses === null) {
    return <h1 className="loading">Loading...</h1>;
  }

  console.log("Courses:", courses);
  return (
    <main className="content-section">
      <Switch>
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
        <Route path={`${match.path}/detail/:id`}>
          <CourseDetailItem />
          <Link to={`${match.path}/`}>Back</Link>
        </Route>
        <Route path={`${match.path}/`} exact={true}>
          <CourseList>{emptyListOrNot()}</CourseList>
          <Link to={`${match.path}/new/`}>Add new course?</Link>
        </Route>
      </Switch>
    </main>
  );
}
