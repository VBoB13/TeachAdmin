import React from "react";
import RegisterForm from "./forms/RegisterForm";
import RegisterBuddy from "./forms/register/RegisterBuddy";

export default function Register(props) {
  return (
    <div className="container rounded p-3">
      <RegisterBuddy />
      <RegisterForm />
    </div>
  );
}
