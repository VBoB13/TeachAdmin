import React, { Component } from "react";

export default class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldName: `${props.fieldName}`,
      value: props.defaultValue ?? "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkAutoFocus = this.checkAutoFocus.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }

  checkAutoFocus() {
    console.log(this.state);
    if (this.state.fieldName === "username")
      return (
        <input
          type="text"
          className="form-control"
          name={this.state.fieldName}
          id={this.state.fieldName}
          value={this.state.value}
          onChange={this.handleChange}
          required
          autoFocus
        ></input>
      );
    return (
      <input
        type="text"
        className="form-control"
        name={this.state.fieldName}
        value={this.state.value}
        onChange={this.handleChange}
      ></input>
    );
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.state.fieldName}>
          {this.state.fieldName[0].toUpperCase() +
            this.state.fieldName.slice(1)}
        </label>
        {this.checkAutoFocus()}
      </div>
    );
  }
}
