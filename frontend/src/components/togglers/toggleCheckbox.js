import React from "react";

const ToggleButton = {
  Info: function Info(props){
    return (
      <input
        type="radio"
        name="options"
        id="get"
        onChange={props.toggleEdit} />
    );
  },
  Edit: function Edit(props){
    return (
      <input
        type="radio"
        name="options"
        id="put"
        onChange={props.toggleEdit} />
    );
  }
}


export default function ToggleCheckBox(props){
    function assignActiveClassName(editBool){
        if(editBool) return "btn btn-info active";
        return "btn btn-dark";
    }
    return (
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label className={assignActiveClassName(!props.stateEdit)}>
          Info
          <ToggleButton.Info
            toggleEdit={props.toggleEdit}
          />
        </label>
        <label className={assignActiveClassName(props.stateEdit)}>
          Edit
          <ToggleButton.Edit
            toggleEdit={props.toggleEdit}
          />
        </label>
      </div>
    );
}