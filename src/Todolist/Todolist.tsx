import React from "react";
import classes from "./Todolist.module.css";
import { FilterType, TaskType } from "../App";
import { useForm } from "react-hook-form";

export type TodoPropsType = {
  title: string;
  tasks: Array<TaskType>;
  deleteTask: (id: string) => void;
  addTask: (title: string) => void;
  setChecked: (id: string) => void;
  setFilter: (filter: FilterType) => void 
};

export type TodoFormType = {
  title: string
}

const Todolist: React.FC<TodoPropsType> = (props) => {
  const {handleSubmit, register, reset} = useForm<TodoFormType>()


  const submit = (data: TodoFormType) => {
    props.addTask(data.title);
    reset()
  }
  return (
    <div className={classes.todo}>
      <h3>{props.title}</h3>
      <form onSubmit={handleSubmit(submit)}>
      <input
        placeholder="Task"
        {...register('title')}
      />
      <button
      >
        +
      </button>
      </form>
      
      <ul>
        {props.tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isDone}
              onClick={() => props.setChecked(task.id)}
            />
            <span>{task.title}</span>
            <button onClick={() => props.deleteTask(task.id)}>X</button>
          </li>
        ))}
      </ul>
      <button onClick={() => props.setFilter('all')}>all</button>
      <button onClick={() => props.setFilter('completed')}>completed</button>
      <button onClick={() => props.setFilter('active')}>active</button>
    </div>
  );
};

export default Todolist;
