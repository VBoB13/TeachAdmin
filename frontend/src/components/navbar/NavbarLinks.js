import React from "react";
import { NavLink } from "react-router-dom";

export default function NavbarLink(props) {
  return (
    <NavLink
      to={props.url_string}
      className="navigation-link"
      activeClassName="navigation-link-active"
    >
      {`${props.url_string[1].toLocaleUpperCase()}${props.url_string.substring(
        2,
        props.url_string.length
      )}`}
    </NavLink>
  );
}
