import React, { useState } from "react";
import Todolist from "./Todolist/Todolist";
import { v1 } from "uuid";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterType = 'all' | 'completed' | 'active'

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: false },
  ]);

  const [filter, setFilterState] = useState<FilterType>('all')

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addTask = (title: string) => {
    setTasks([...tasks, { id: v1(), title, isDone: false }]);
  };

  const setChecked = (id: string) => {
    setTasks(
      tasks.filter((task) => {
        if (task.id === id) {
          task.isDone = !task.isDone;
        }
        return task;
      })
    );
  };

  let filteredTasks = tasks

  if (filter === 'active'){
    filteredTasks = filteredTasks.filter(task => !task.isDone )
  }
  if (filter === 'completed'){
    filteredTasks = filteredTasks.filter(task => task.isDone)
  }

  const setFilter = (filter: FilterType) => {
    setFilterState(filter)
  }

  return (
    <div className="App">
      <Todolist
        setChecked={setChecked}
        title="TODO"
        tasks={filteredTasks}
        deleteTask={deleteTask}
        addTask={addTask}
        setFilter = {setFilter}
      />
    </div>
  );
}

export default App;
