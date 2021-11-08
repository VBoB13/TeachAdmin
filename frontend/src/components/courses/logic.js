import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { RequestHandler } from "../../helpers/auth";

import SelectField, {
  SelectOption,
} from "../accounts/forms/fields/SelectField";
import ToggleCheckBox from "../togglers/toggleCheckbox";
import { CourseForm } from "./courses";

export async function getCourses(url = "/courses/all/", method = "GET") {
  let reqObj = new RequestHandler(url, method);
  let response = await reqObj.sendRequest();
  return response;
}

export async function deleteCourse(id) {
  // console.log(`Attempting to delete course with ID: ${id}`);
  let reqObj = new RequestHandler(`/courses/${id}/`, "DELETE");
  let response = await reqObj.sendRequest();
  return response;
}

export function redirectListView() {
  setTimeout(() => {
    location.reload();
  }, 500);
}

export function CourseListItem(props) {
  const removeCourse = () => {
    let response = deleteCourse(props.course.id);
    console.log("Got this as response:", response);
    if (response.status === 204) {
      console.log(`Successfully deleted ${props.course} !`);
      console.log("Redirecting back to list view...");
      redirectListView();
    } else {
      console.log(
        `Server responded with the following status code: ${response.status}`
      );
      redirectListView();
    }
  };
  return (
    <div className="course-list-item">
      <h5
        onClick={() => {
          props.course.nav_to_detail();
        }}
      >
        {props.course.name}
      </h5>
      <small className="help-text">
        Grade {props.course.grade} ({props.course.start_date} -{" "}
        {props.course.end_date})
      </small>
      <button className="standard-button-delete-small" onClick={removeCourse}>
        X
      </button>
    </div>
  );
}

export function CourseDetailItem(props) {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    const getCourse = async () => {
      try {
        const current_course = await getCourses(`/courses/${id}/`);
        setCourse(new Course(current_course));
      } catch (error) {
        console.error(error);
      }
    };
    getCourse();
  }, []);

  if (course !== null) {
    if (edit === false)
      return (
        <div className="course-detail">
          <ToggleCheckBox stateEdit={edit} toggleEdit={toggleEdit} />
          {course.to_detail_component()}
        </div>
      );
    return (
      <div className="course-detail">
        <ToggleCheckBox stateEdit={edit} toggleEdit={toggleEdit} />
        <CourseForm course={course} />
      </div>
    );
  }
  return <h1>Loading...</h1>;
}

export class Subject {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
  to_option() {
    return (
      <SelectOption
        key={this.id}
        option_value={this.id}
        option_text={this.name}
      />
    );
  };
}

export default class Course {
  constructor({
    id,
    name,
    grade,
    subject,
    start_date,
    end_date,
    teacher,
    students,
  }) {
    this.id = id ?? null;
    this.name = name;
    this.grade = grade;
    this.subject = subject;
    this.start_date = start_date;
    this.end_date = end_date;
    this.teacher = teacher;
    this.students = students;
  }

  toString() {
    return `Course: ${this.name}\nGrade: ${this.grade}`;
  }

  to_new_course() {
    return JSON.stringify({
      name: this.name,
      grade: this.grade,
      subject: this.subject,
      start_date: this.start_date,
      end_date: this.end_date,
      teacher: this.teacher,
      students: this.students,
    });
  }

  to_update_course() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      grade: this.grade,
      subject: this.subject,
      start_date: this.start_date,
      end_date: this.end_date,
      teacher: this.teacher,
      students: this.students,
    });
  }

  to_list_component() {
    return <CourseListItem key={this.id} course={this} />;
  }

  nav_to_detail() {
    location.replace(`/courses/detail/${this.id}`);
  }

  to_detail_component() {
    return (
      <section className="course-detail">
        <h3 className="course-title">{this.name}</h3>
        <ul className="course-attribute-list">
          <li className="course-attribute">Grade: {this.grade}</li>
          <li className="course-attribute">Subject: {this.subject.name}</li>
          <li className="course-attribute">Start date: {this.start_date}</li>
          <li className="course-attribute">End date: {this.end_date}</li>
          <li className="course-attribute">Students: {this.students}</li>
        </ul>
      </section>
    );
  }
}
