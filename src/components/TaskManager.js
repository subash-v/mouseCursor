import React from "react";
import Task from "./Task";
import TaskEditor from "./TaskEditor";
import styles from "./TaskManager.module.css";
import { buttonGreen } from "./TaskEditor.module.css";
export default class TaskManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      inprogress: [],
      done: [],
      editorOpen: false,
      editedTask: null,
      selectedTask: null
    };
    this.inProgressRef = React.createRef();
    this.todoRef = React.createRef();
    this.doneRef = React.createRef();
    this.todoCo = null;
    this.inProgressCo = null;
    this.doneCo = null;
  }

  componentDidMount() {
    this.todoCo = {
      left: this.todoRef.current.getBoundingClientRect().left,
      right: this.todoRef.current.getBoundingClientRect().right
    };
    this.inProgressCo = {
      left: this.inProgressRef.current.getBoundingClientRect().left,
      right: this.inProgressRef.current.getBoundingClientRect().right
    };
    this.doneCo = {
      left: this.doneRef.current.getBoundingClientRect().left,
      right: this.doneRef.current.getBoundingClientRect().right
    };
  }
  createTask = val => {
    const id = Math.random()
      .toString(36)
      .substring(7);
    const task = { id, ...val };
    const todo = [...this.state.todo, task];
    this.setState({ todo, editorOpen: false });
  };
  editTask = val => {
    if (this.state.todo.map(value => value.id).includes(val.id)) {
      const todo = this.state.todo.map(value => {
        if (value.id === val.id) {
          return val;
        } else {
          return value;
        }
      });
      this.setState({ todo, editorOpen: false });
    }
    if (this.state.inprogress.map(value => value.id).includes(val.id)) {
      const inprogress = this.state.inprogress.map(value => {
        if (value.id === val.id) {
          return val;
        } else {
          return value;
        }
      });
      this.setState({ inprogress, editorOpen: false });
    }
    if (this.state.done.map(value => value.id).includes(val.id)) {
      const done = this.state.done.map(value => {
        if (value.id === val.id) {
          return val;
        } else {
          return value;
        }
      });
      this.setState({ done, editorOpen: false });
    }
  };

  deleteTask = val => {
    if (
      this.state.todo.length > 0 &&
      this.state.todo.map(value => value.id).includes(val.id)
    ) {
      const todo = this.state.todo.filter(value => {
        return value.id !== val.id;
      });
      this.setState({ todo });
    }
    if (
      this.state.inprogress.length > 0 &&
      this.state.inprogress.map(value => value.id).includes(val.id)
    ) {
      const inprogress = this.state.inprogress.filter(value => {
        return value.id !== val.id;
      });
      this.setState({ inprogress });
    }
    if (
      this.state.done.length > 0 &&
      this.state.done.map(value => value.id).includes(val.id)
    ) {
      const done = this.state.done.filter(value => {
        return value.id !== val.id;
      });
      this.setState({ done });
    }
  };

  handleEdit = val => {
    this.setState({ editedTask: val, editorOpen: true });
  };
  handleAdd = () => {
    this.setState({ editedTask: null, editorOpen: true });
  };
  closeEditor = () => {
    this.setState({ editedTask: null, editorOpen: false });
  };

  handleMouseMove(event) {
    const mouseCoordinates = { x: event.pageX, y: event.pageY };
    this.setState({ mouseCoordinates });
  }
  handleMouseLeave() {
    console.log("Leaving");
  }
  handleMouseDown(val, event) {
    event.stopPropagation();
    this.setState({ selectedTask: val });
  }
  handleMouseUp() {
    if (this.state.selectedTask) {
      if (
        this.state.mouseCoordinates.x > this.todoCo.left &&
        this.state.mouseCoordinates.x < this.todoCo.right &&
        !this.state.todo
          .map(value => value.id)
          .includes(this.state.selectedTask.id)
      ) {
        this.deleteTask(this.state.selectedTask);
        const todo = [...this.state.todo, this.state.selectedTask];
        this.setState({ todo });
      }
      if (
        this.state.mouseCoordinates.x > this.inProgressCo.left &&
        this.state.mouseCoordinates.x < this.inProgressCo.right &&
        !this.state.inprogress
          .map(value => value.id)
          .includes(this.state.selectedTask.id)
      ) {
        this.deleteTask(this.state.selectedTask);
        const inprogress = [...this.state.inprogress, this.state.selectedTask];
        this.setState({ inprogress });
      }
      if (
        this.state.mouseCoordinates.x > this.doneCo.left &&
        this.state.mouseCoordinates.x < this.doneCo.right &&
        !this.state.done
          .map(value => value.id)
          .includes(this.state.selectedTask.id)
      ) {
        this.deleteTask(this.state.selectedTask);
        const done = [...this.state.done, this.state.selectedTask];
        this.setState({ done });
      }
      this.setState({ selectedTask: null });
    }
  }

  render() {
    // const mouse = this.state.mouseCoordinates;
    return (
      <div className={styles.base}>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={buttonGreen} onClick={this.handleAdd}>
              Add Task
            </div>
          </div>
          <div
            onMouseUp={() => {
              this.handleMouseUp();
            }}
            onMouseMove={e => this.handleMouseMove(e)}
            onMouseLeave={() => this.handleMouseLeave()}
          >
            <div className={styles.column} ref={this.todoRef}>
              <div className={styles.card}>
                <div className={styles.header}>Things To Do</div>
                {this.state.todo.map(val => (
                  <div
                    className={styles.row}
                    // style={{
                    //   transform: `translate(${mouse.x}px , ${mouse.y}px)`
                    // }}
                    onMouseDown={e => this.handleMouseDown(val, e)}
                  >
                    <Task
                      name={val.name}
                      description={val.label}
                      onClick={() => this.handleEdit(val)}
                      delete={() => this.deleteTask(val)}
                    ></Task>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.column} ref={this.inProgressRef}>
              <div className={styles.card}>
                <div className={styles.header}>Doing</div>
                {this.state.inprogress.map(val => (
                  <div
                    className={styles.row}
                    onMouseDown={e => this.handleMouseDown(val, e)}
                  >
                    <Task
                      name={val.name}
                      description={val.label}
                      onClick={() => this.handleEdit(val)}
                      delete={() => this.deleteTask(val)}
                    ></Task>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.column} ref={this.doneRef}>
              <div className={styles.card}>
                <div className={styles.header}>Done</div>
                {this.state.done.map(val => (
                  <div
                    className={styles.row}
                    onMouseDown={e => this.handleMouseDown(val, e)}
                  >
                    <Task
                      name={val.name}
                      description={val.label}
                      onClick={() => this.handleEdit(val)}
                      delete={() => this.deleteTask(val)}
                    ></Task>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {this.state.editorOpen && (
          <div
            className={styles.layer}
            onClick={() => {
              this.setState({ editorOpen: false });
            }}
          ></div>
        )}
        <div
          className={this.state.editorOpen ? styles.panel : styles.panelClose}
        >
          {this.state.editorOpen && (
            <TaskEditor
              {...this.state.editedTask}
              onEdit={val => this.editTask(val)}
              createTask={this.createTask}
            />
          )}
        </div>
      </div>
    );
  }
}
