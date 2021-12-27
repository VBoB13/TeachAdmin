import React from "react";
import { NavLink } from "react-router-dom";

export default function NavbarLink(props) {
  return (
    <NavLink
      to={props.url_string}
      className={({isActive}) => isActive ? "navigation-link-active" : "navigation-link"}
    >
      {`${props.url_string[1].toLocaleUpperCase()}${props.url_string.substring(
        2,
        props.url_string.length
      )}`}
    </NavLink>
  );
}
