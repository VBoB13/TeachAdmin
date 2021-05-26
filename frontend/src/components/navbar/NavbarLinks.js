import React from "react";
import { NavLink } from "react-router-dom";

export default function NavbarLink(props){
    console.log(`Creating NavLink for URL: '${props.url_string}'`);
    return (
      <li className="nav-item">
        <NavLink
          to={props.url_string}
          className="nav-link"
          activeClassName="nav-link active"
        >
          {`${props.url_string[1].toLocaleUpperCase()}${props.url_string.substring(
            2,
            props.url_string.length - 1
          )}`}
        </NavLink>
      </li>
    );
}
