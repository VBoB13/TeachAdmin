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
import InputField from "../accounts/forms/fields/InputField";
import DateField from "../accounts/forms/fields/DateField";
import SelectField, {
  SelectOption,
} from "../accounts/forms/fields/SelectField";

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
  location.replace("/students/");
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
      {props.name} (<b>#{props.student_number}</b>)
      <button
        className="truncate-button"
        onClick={() => {
          setTruncate(!truncate);
        }}
      >
        {truncateString(truncate)}
      </button>
      <dl className="studentData" hidden={truncate}>
        <dt>Birthday:</dt>
        <dd>{props.birthday}</dd>
        <dt>Country:</dt>
        <dd>{props.country}</dd>
      </dl>
    </li>
  );
}

function StudentsList({ children }) {
  return <ol className="studentList">{children}</ol>;
}

// Create Student
function StudentForm(props) {
  var today = new Date();
  var date_str = today.toISOString().split("T")[0];

  return (
    <div className="form-content">
      <form className="rounded" onSubmit={createStudent}>
        <input id="teacher_id" type="hidden" value={props.teacher_id} />
        <TextField
          id="student_name"
          fieldname="name"
          fieldtype="text"
          required={true}
          autoFocus
        />
        <DateField
          id="student_bday"
          fieldname="birthday"
          min="1921-01-01"
          max={`${date_str}`}
          init_value={`${date_str}`}
          required={true}
        />
        <TextField
          id="student_num"
          fieldname="student number"
          fieldtype="text"
          help_text="Optional."
        />
        <SelectField
          fieldID="student_country"
          fieldname="country"
          options={props.country_options}
        />
        <input type="submit" className="standard-button" value="Add Student" />
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
      <h1>Students</h1>
      <span>
        You have <b>{`${students.length}`}</b> students.
      </span>
      <Switch>
        <Route path={`${match.path}/new/`}>
          <section className="add-student">
            <StudentForm
              teacher_id={teacher_id.current}
              country_options={country_options.current}
            />
          </section>
        </Route>
        <Route path={`${match.path}/delete/:id`}></Route>
        <Route path={`${match.path}`}>
          <StudentsList>{studentItems}</StudentsList>
          <Link to={`${match.url}new/`}>Add a student?</Link>
        </Route>
      </Switch>
    </main>
  );
}
