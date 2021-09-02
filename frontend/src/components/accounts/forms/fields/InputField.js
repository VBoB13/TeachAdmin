import React, { Component } from "react";

export default class InputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      fieldname: props.fieldname,
      fieldtype: props.fieldtype ?? "text",
      value: props.defaultvalue ?? "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.state.fieldname}>
          {this.state.fieldname[0].toUpperCase() +
            this.state.fieldname.slice(1)}
        </label>
        <input
          type={this.state.fieldtype}
          className="form-control"
          name={this.state.fieldname}
          id={this.state.fieldname}
          onChange={this.handleChange}
          value={this.state.value}
          {...this.props}
        />
      </div>
    );
  }
}
