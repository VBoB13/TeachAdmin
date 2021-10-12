import React, { useState, useRef, useEffect } from "react";
import { Switch, Route, Link, useParams, useRouteMatch } from "react-router";

import Course, { getCourses } from "./logic";

export default function Courses(props) {
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

  console.log(courses);

  return <section className="courses-list"></section>;
}
