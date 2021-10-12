import React from "react";
import { RequestHandler } from "../../helpers/auth";

export async function getCourses() {
  let reqObj = new RequestHandler("/courses/all/");
  let response = await reqObj.sendRequest();
  return response;
}

export function CourseListItem(props) {
  return (
    <div className="course-list-item">
      <h5>{props.course.name}</h5>
      <span className="help-text">
        Grade {props.course.grade} ({props.course.start_date} -{" "}
        {props.course.end_date})
      </span>
    </div>
  );
}

export default class Course {
  constructor({
    name,
    grade,
    subject,
    start_date,
    end_date,
    teacher,
    students,
  }) {
    this.name = name;
    this.grade = grade;
    this.subject = subject;
    this.start_date = start_date;
    this.end_date = end_date;
    this.teacher = teacher;
    this.students = students;
  }

  to_list_component() {
    return <CourseListItem course={this} />;
  }

  to_detail_component() {
    return;
  }
}
