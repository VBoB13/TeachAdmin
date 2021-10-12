import React, { useContext } from "react";

import { TeacherContext } from "../../../App";

export default function HiddenTeacherField(props) {
  const teacher = useContext(TeacherContext);
  return <input type="hidden" id="teacher_id" value={teacher.id} />;
}
