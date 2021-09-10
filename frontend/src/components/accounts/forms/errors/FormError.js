import React from "react";

export default function FormError(props) {
  return (
    <div className="formError rounded bg-danger">
      <p>{props.errorText}</p>
    </div>
  );
}
