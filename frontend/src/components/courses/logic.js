import { RequestHandler } from "../../helpers/auth";

export async function getCourses() {
  let reqObj = new RequestHandler("/courses/all/");
  let response = await reqObj.sendRequest();
  return response;
}

export default class Course {
  constructor(name, grade, subject, start_date, end_date, teacher, students) {
    this.name = name;
    this.grade = grade;
    this.subject = subject;
    this.start_date = start_date;
    this.end_date = end_date;
    this.teacher = teacher;
    this.students = students;
  }

  to_list_component() {
    return (
      <div className="course-list-item">
        <h5>{this.name}</h5>
        <span className="help-text">
          Grade {this.grade} ({this.start_date} - {this.end_date})
        </span>
      </div>
    );
  }

  to_detail_component() {
    return;
  }
}
