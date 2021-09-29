import React, { Component } from "react";

export default class InputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      fieldname: props.fieldname,
      fieldtype: props.fieldtype ?? "text",
      value: props.init_value ?? "",
      help_text: props.help_text ?? "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.generate_help_text = this.generate_help_text.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  generate_help_text() {
    if (this.state.help_text !== "")
      return <small className="help-block">{this.state.help_text}</small>;
    return;
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
          id={this.state.id}
          onChange={this.handleChange}
          value={this.state.value}
          {...this.props}
        />
        {this.generate_help_text()}
      </div>
    );
  }
}
