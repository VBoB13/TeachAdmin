import React, { useState, useEffect, useRef } from "react";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import { RequestHandler } from "../../helpers/auth";
import TextField from "../accounts/forms/fields/TextField";
import DateField from "../accounts/forms/fields/DateField";
import SelectField from "../accounts/forms/fields/SelectField";

// Fetching students from API
async function getStudents() {
  var reqObj = new RequestHandler("/students/all/");
  let response = await reqObj.sendRequest();
  console.log(response);
  return response;
}

// POST request to ADD Student
async function addStudent(studentObj) {
  var reqObj = new RequestHandler("/students/all/", "POST");
  reqObj.request_conf["data"] = JSON.stringify(studentObj);
  let response = await reqObj.sendRequest();
  return response;
}

async function deleteStudent(studentID) {
  var reqObj = new RequestHandler(`/students/${studentID}/`, "DELETE");
  let response = await reqObj.sendRequest();
  return response;
}

async function putStudent(studentObj) {
  var reqObj = new RequestHandler(`/students/${studentObj.id}/`, "PUT");
  reqObj.request_conf["data"] = JSON.stringify(studentObj);
  let response = await reqObj.sendRequest();
  return response;
}

// Editing a Student
function editStudent(e) {
  e.preventDefault();
  let teacher_id = document.getElementById("teacher_id").value;
  let student_id = document.getElementById("student_id").value;
  let student_name = document.getElementById("student_name").value;
  let student_bday = document.getElementById("student_bday").value;
  let student_num = document.getElementById("student_num").value;
  let student_country = document.getElementById("student_country").value;
  let student = {
    id: student_id,
    name: student_name,
    teacher: teacher_id,
    birthday: student_bday,
    student_number: student_num,
    country: student_country,
  };
  try {
    putStudent(student);
  } catch (error) {
    console.log(
      "Something went wrong when trying to edit a student's information!"
    );
    console.error(error);
  }
  setTimeout(() => {
    location.reload();
  }, 200);
}

// Creating the Student object which is then sent to 'addStudent'
function createStudent(e) {
  e.preventDefault();
  let teacher_id = document.getElementById("teacher_id").value;
  let student_name = document.getElementById("student_name").value;
  let student_bday = document.getElementById("student_bday").value;
  let student_num = document.getElementById("student_num").value;
  let student_country = document.getElementById("student_country").value;
  let student = {
    name: student_name,
    teacher: teacher_id,
    birthday: student_bday,
    student_number: student_num,
    country: student_country,
  };
  console.log(
    `${student_name}: \nBirthday: ${student_bday}\nStudent number: ${student_num}\nTeacher ID: ${teacher_id}`
  );
  try {
    addStudent(student);
  } catch (error) {
    console.log("Something went wrong when trying to add a student.");
    console.error(error);
  }
  setTimeout(() => {
    location.replace("/students/");
  }, 200);
}

function StudentItem(props) {
  const [truncate, setTruncate] = useState(true);

  // Making a "+" or "-" string for truncate-button
  const truncateString = (truncate) => {
    if (truncate) return ">";
    return "v";
  };

  return (
    <li className="studentItem">
      <Link to={`/students/detail/${props.id}/`}>{props.name}</Link> (
      <b>#{props.student_number}</b>)
      <button
        className="truncate-button"
        onClick={() => {
          setTruncate(!truncate);
        }}
      >
        {truncateString(truncate)}
      </button>
      <button
        className="standard-button-delete-small"
        onClick={() => {
          location.replace(`/students/delete/${props.id}/`);
        }}
      >
        X
      </button>
      <dl className="studentData" hidden={truncate}>
        <dt>Birthday:</dt>
        <dd>{props.birthday}</dd>
        <dt>Country:</dt>
        <dd>{props.country ?? "N/A"}</dd>
      </dl>
    </li>
  );
}

function StudentsList({ children }) {
  return <ol className="studentList">{children}</ol>;
}

// Create/Edit Student
function StudentForm(props) {
  var today = new Date();
  var date_str = today.toISOString().split("T")[0];
  var addEdit = props.edit ? "Edit" : "Add";
  // const [submittable, setsubmittable] = useState(props.edit ? false : true);

  const createOReditStudent = () => {
    if (props.edit) return editStudent;
    return createStudent;
  };

  return (
    <div className="form-content">
      <form className="rounded" onSubmit={createOReditStudent()}>
        <input id="teacher_id" type="hidden" value={props.teacher_id} />
        <input id="student_id" type="hidden" value={props.student.id} />
        <TextField
          id="student_name"
          fieldname="name"
          fieldtype="text"
          required={true}
          init_value={props.student ? props.student.name : ""}
          autoFocus
        />
        <DateField
          id="student_bday"
          fieldname="birthday"
          min="1921-01-01"
          max={`${date_str}`}
          init_value={props.student ? props.student.birthday : `${date_str}`}
          required={true}
        />
        <TextField
          id="student_num"
          fieldname="student number"
          fieldtype="text"
          init_value={props.student ? props.student.student_number : ""}
          help_text="Optional."
        />
        <SelectField
          fieldID="student_country"
          fieldname="country"
          options={props.country_options}
          student={props.student ?? null}
        />
        <input
          type="submit"
          className="standard-button"
          value={`${addEdit} Student`}
        />
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

// DELETE Student
export function StudentDelete(props) {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const getStudent = async (id) => {
      try {
        let reqObj = new RequestHandler(`/students/${id}/`);
        let student = await reqObj.sendRequest();
        setStudent(student);
      } catch (error) {
        console.error(error);
      }
    };
    getStudent(id);
  }, []);

  console.log(student);
  if (student) {
    return (
      <section className="student-delete">
        <h1>Delete student?</h1>
        <div className="student-data">
          <h3>
            <u>{student.name}</u>
          </h3>
          <p>
            <b>Student #:</b> {student.student_number}
          </p>
          <p>
            <b>Birthday:</b> {student.birthday}
          </p>
          <p>
            <b>Country:</b>{" "}
            {props.countries[`${student.country}`]
              ? props.countries[`${student.country}`]
              : "N/A"}
          </p>
        </div>
        <button
          className="standard-button-delete"
          onClick={async () => {
            try {
              var response = await deleteStudent(student.id);
            } catch (error) {
              console.error(error);
            } finally {
              console.log(response);
              if (response.status !== 204) {
                alert(
                  `Something went wrong! You most likely tried to delete a student that wasn't yours, and that is NOT allowed. Redirecting back to /students/ in a couple of seconds...`
                );
              }
              setTimeout(() => {
                location.replace("/students/");
              }, 2000);
            }
          }}
        >
          Delete
        </button>
        <button
          className="standard-button-cancel"
          onClick={() => {
            history.back();
          }}
        >
          Cancel
        </button>
      </section>
    );
  }
  return (
    <section className="student-delete">
      <h1>Loading...</h1>
    </section>
  );
}

// Student DETAIL
export function StudentDetail(props) {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const getStudent = async (id) => {
      try {
        let reqObj = new RequestHandler(`/students/${id}/`);
        let student = await reqObj.sendRequest();
        setStudent(student);
      } catch (error) {
        console.error(error);
      }
    };
    getStudent(id);
  }, []);

  if (student) {
    console.log({ student });
    return (
      <section className="student-detail">
        <h1>{student.name}</h1>
        <section className="add-student">
          <StudentForm
            teacher_id={props.teacher_id}
            student={student}
            country_options={props.countries}
            edit={true}
          />
        </section>
      </section>
    );
  }
  return (
    <section className="student-detail">
      <h1>Loading...</h1>
    </section>
  );
}

// Students-page MAIN
export default function Students(props) {
  let match = useRouteMatch();
  // State to hold values
  const [students, setStudents] = useState([]);
  const country_options = useRef([]);
  const teacher_id = useRef(0);
  // Effect to fetch values
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        country_options.current = response.countries;
        teacher_id.current = response.data.id;
        setStudents(response.data.students);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudents();
  }, []);

  var studentItems = students.map((student, index) => {
    return (
      <StudentItem
        key={index}
        id={student.id}
        name={student.name}
        student_number={student.student_number}
        birthday={student.birthday}
        country={country_options.current[`${student.country}`]}
      />
    );
  });

  return (
    <main className="content-section">
      <Switch>
        <Route path={`${match.path}/new/`}>
          <section className="add-student">
            <StudentForm
              teacher_id={teacher_id.current}
              country_options={country_options.current}
            />
          </section>
        </Route>
        <Route
          path={`${match.path}/delete/:id`}
          children={<StudentDelete countries={country_options.current} />}
        />
        <Route
          path={`${match.path}/detail/:id`}
          children={
            <StudentDetail
              teacher_id={teacher_id.current}
              countries={country_options.current}
            />
          }
        />
        <Route path={`${match.path}`}>
          <h1>Students</h1>
          <span>
            You have <b>{`${students.length}`}</b> students.
          </span>
          <StudentsList>{studentItems}</StudentsList>
          <Link to={`${match.url}new/`}>Add a student?</Link>
        </Route>
      </Switch>
    </main>
  );
}
