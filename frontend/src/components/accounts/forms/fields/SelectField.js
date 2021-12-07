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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getSubjects = async () => {
      let reqObj = new RequestHandler("/courses/subjects/");
      try{
        const data = await reqObj.sendRequest();
        setSubjects(
          data.map((item) => {
            return <Subject subject={item} />;
          })
        );
        setLoaded(true);
      }
      catch(error){
        console.log(`Something went wrong when trying load Subjects from server!`);
        console.error(error);
        setLoaded(false);
      }
      
    };
    getSubjects();
  }, []);
  console.log({ subjects });

  if(loaded) return <SelectField init_value={props.init_value} options={subjects} {...props} />;
  return <span>Loading Subject list...</span>;
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
      <SelectOption key={0} option_value="0" option_text="None" />
    );

    let count = 1;

    if (!Array.isArray(props.options)) {
      for (var [value, name] of Object.entries(props.options)) {
        element_list.push(
          <SelectOption key={count} option_value={value} option_text={name} />
        );
        count += 1;
      }
    } else {
      props.options.forEach((subjectEl) => {
        element_list.push(
          <SelectOption
            key={count} 
            option_value={subjectEl.props.subject.id} 
            option_text={subjectEl.props.subject.name} />
        );
        count += 1;
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
        {nameToString()}
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
