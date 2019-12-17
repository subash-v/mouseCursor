import React from "react";
import styles from "./Input.module.css";

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focused: false };
  }
  handleChange = val => this.props.onChange(val.target.value);
  onFocus = () => {
    this.setState({ focused: true });
  };
  onBlur = () => {
    this.setState({ focused: false });
  };
  render() {
    return (
      <div className={styles.base}>
        <div
          className={
            this.state.focused || this.props.value
              ? styles.labelActive
              : styles.label
          }
        >
          {this.props.label}
        </div>
        <input
          value={this.props.value}
          onChange={this.handleChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
        />
        <div className={styles.slide}>
          <div
            className={
              this.state.focused || this.props.value
                ? styles.sliderActive
                : styles.slider
            }
          ></div>
        </div>
      </div>
    );
  }
}
