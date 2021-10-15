import React from "react";
import { RequestHandler } from "../../helpers/auth";

import SelectField, {
  SelectOption,
} from "../accounts/forms/fields/SelectField";

export async function getCourses() {
  let reqObj = new RequestHandler("/courses/all/");
  let response = await reqObj.sendRequest();
  return response;
}

export function CourseListItem(props) {
  return (
    <div className="course-list-item">
      <h5>{props.course.name}</h5>
      <small className="help-text">
        Grade {props.course.grade} ({props.course.start_date} -{" "}
        {props.course.end_date})
      </small>
    </div>
  );
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
  }
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

  to_list_component() {
    return <CourseListItem key={this.id} course={this} />;
  }

  to_detail_component() {
    return;
  }
}
