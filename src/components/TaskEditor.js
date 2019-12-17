import React from "react";
import Input from "./Input";
import styles from "./TaskEditor.module.css";

export default class TaskEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name ? this.props.name : "",
      label: this.props.label ? this.props.label : ""
    };
  }
  handleEdit = () => {
    this.props.onEdit({
      label: this.state.label,
      name: this.state.name,
      id: this.props.id
    });
  };
  handleCreate = () => {
    this.props.createTask({
      label: this.state.label,
      name: this.state.name
    });
  };
  handleDelete = () => {
    this.props.onDelete();
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.header}>Modify your task</div>
        <div className={styles.row}>
          <Input
            label="Task name"
            value={this.state.name}
            onChange={val => this.setState({ name: val })}
          />
        </div>
        <div className={styles.row}>
          <Input
            label="Task description"
            value={this.state.label}
            onChange={val => this.setState({ label: val })}
          />
        </div>
        <div className={styles.row}>
          {this.props.name ? (
            <div className={styles.buttonGreen} onClick={this.handleEdit}>
              Edit
            </div>
          ) : (
            <div className={styles.buttonGreen} onClick={this.handleCreate}>
              Add
            </div>
          )}
        </div>
      </div>
    );
  }
}
