import React, { Component } from "react";

export default function ToggleButton(props){
    let btn_class = (value) => {
        let base_class = "btn btn-info";
        if(value) return `${base_class} active`;
        return base_class;
    };
    let btn_value = (value) => {
        if (value) return "Register";
        return "Login";
    };
    return(
        <button
            type="button" 
            className={btn_class(props.value)}
            data-toggle="button"
            aria-pressed={props.value.toString()}
            onClick={props.onClick}>
            {btn_value(props.value)}
        </button> 
    );
}