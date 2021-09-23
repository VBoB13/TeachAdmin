import React, { useState } from "react";

export default function ComputerAuthIcon(props) {
  const [width, setWidth] = useState("30%");

  if (props.width) setWidth(props.width);

  return (
    <img
      id="computerAuth"
      src="/static/frontend/svg/computerAuth.svg"
      alt="Supposedly Ric's image of a secure login..."
    />
  );
}
