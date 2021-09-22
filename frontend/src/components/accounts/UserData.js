import React from "react";

export default function UserData(props) {
  return (
    <section className="user-info rounded p-2 mt-2">
      <dl>
        <dt>Country</dt>
        <dd>
          {props.country} ({props.country_code})
        </dd>
        <dt>Career URL</dt>
        <dd>
          <a href={props.career_profile} target="_blank">
            {props.career_profile.slice(0, 25)}...
          </a>
        </dd>
        <dt>Member since:</dt>
        <dd>{props.date_joined}</dd>
      </dl>
    </section>
  );
}
