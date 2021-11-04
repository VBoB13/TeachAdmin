import React, { useEffect, useState, useContext } from "react";
import { RequestHandler } from "../../../../helpers/auth";
import { Subject } from "../../../courses/logic";

export function SelectOption(props) {
  return <option value={`${props.option_value}`} >{`${props.option_text}`}</option>;
}

export function CountrySelectField(props) {
  return (
    <SelectField
      init_value={props?.student?.country ? `${props.student.country}` : ""}
      {...props}
    />
  );
}

export function SubjectSelectField(props) {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const getSubjects = async () => {
      let reqObj = new RequestHandler("/courses/subjects/");
      const data = await reqObj.sendRequest();
      setSubjects(
        data.map((item) => {
          return new Subject(item);
        })
      );
    };
    getSubjects();
  }, []);
  console.log({ subjects });

  return <SelectField options={subjects} {...props} />;
}

export default function SelectField(props) {
  /* 
  PARAMS:
    - fieldname (String)
    - fieldID (String)
    - options (Array([Object, Object...]) [{"option_value": "option_name"}, ...])
    - init_value (String "option_value")
  */
  const generate_options = () => {
    // Function for handling SelectField options
    let element_list = [];
    element_list.push(
      <SelectOption key={0} option_value="" option_text="None" />
    );

    var count = 1;

    if (!Array.isArray(props.options)) {
      for (var [value, name] of Object.entries(props.options)) {
        element_list.push(
          <SelectOption key={count} option_value={value} option_text={name} />
        );
        count += 1;
      }
    } else {
      props.options.forEach((subject) => {
        element_list.push(subject.to_option());
      });
    }
    return element_list;
  };

  const nameToString = () => {
    // Converts props.fieldname into a properly formatted name
    if(props.fieldname.indexOf("_")){
      var full_field_name = `${props.fieldname.split("_").join(" ")}`;
      return `${full_field_name[0].toUpperCase() + full_field_name.slice(1)}`;
    };
    return `${props.fieldname[0].toUpperCase() + props.fieldname.slice(1)}`;
  };

  return (
    <div className="form-group">
      <label htmlFor={props.fieldname}>
        {nameToString()}:
      </label>
      <select
        name={`${props.fieldname}`}
        id={`${props.fieldID}`}
        className="countries"
        defaultValue={props?.init_value ? `${props.init_value}` : ""}
      >
        {generate_options()}
      </select>
    </div>
  );
}
