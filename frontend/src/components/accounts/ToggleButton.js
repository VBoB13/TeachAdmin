import React, { Component } from "react";

export default function ToggleButton(props){
    let btn_class = (value) => {
        if(value) return "btn btn-secondary active";
        return "btn btn-secondary";
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