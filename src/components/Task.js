import React from "react";
import styles from "./Task.module.css";

export default function Task(props) {
  const handleEdit = e => {
    e.stopPropagation();
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <div className={styles.base}>
      <div className={styles.name}>{props.name}</div>
      <div className={styles.label}>{props.description}</div>
      <div style={{ marginTop: 10 }}>
        <div className={styles.button} onClick={handleEdit}>
          Edit
        </div>
        <div className={styles.button} onClick={props.delete}>
          Delete
        </div>
      </div>
    </div>
  );
}
