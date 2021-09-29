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

async function getStudents() {
  var reqObj = new RequestHandler("/students/all/");
  let response = await reqObj.sendRequest();
  console.log(response);
  return response;
}

function createStudent(e) {
  e.preventDefault();
  let student_name = document.getElementById("student_name").value;
  let student_bday = document.getElementById("student_bday").value;
  console.log(`${student_name}: ${student_bday}`);
}

function StudentsList({ children }) {
  return <section className="studentList">{children}</section>;
}

// Create Student
function StudentForm(props) {
  var today = new Date();
  var date_str = today.toISOString().split("T")[0];

  return (
    <div className="form-content">
      <form className="rounded" onSubmit={createStudent}>
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
  // Effect to fetch values
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        country_options.current = response.countries;
        setStudents(response.data.students);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudents();
  }, []);

  console.log("Countries:", country_options.current);

  return (
    <main className="content-section">
      <h1>Students</h1>
      <span>
        You have <b>{`${students.length}`}</b> students.
      </span>
      <section className="add-student">
        <Switch>
          <Route path={`${match.path}/new/`}>
            <StudentForm country_options={country_options.current} />
          </Route>
          <Route path={`${match.path}`}>
            <Link to={`${match.url}new/`}>Add a student?</Link>
          </Route>
        </Switch>
      </section>
    </main>
  );
}
