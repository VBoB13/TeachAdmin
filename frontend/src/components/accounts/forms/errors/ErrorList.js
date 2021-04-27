import React from "react";


export default function ErrorList(props) {
    const errors = props.errors.map((error, index) => 
        <li key={index}>{error}</li>
    );
    var errorList = <ul className="errorlist my-2">{errors}</ul>;
    return errorList;
}