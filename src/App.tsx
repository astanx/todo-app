import React, { useState } from "react";
import Todolist from "./Todolist/Todolist";
import { v1 } from "uuid";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type StateTasksType = {
  [key: string]: Array<TaskType>
}

export type FilterType = "all" | "completed" | "active";

export type TodoListType = {
  title: string;
  id: string;
  filter: FilterType;
};

function App() {
  const todoListId_1 = v1();
  const todoListId_2 = v1();

  const [allTasks, setAllTasks] = useState<StateTasksType>({
    [todoListId_1]: [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: false },
    ],

    [todoListId_2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Bread", isDone: false },
    ],
  });

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { title: "TODO", filter: "all", id: todoListId_1 },
    { title: "TO BUY", filter: "all", id: todoListId_2 },
  ]);

  const deleteTask = (todoListId: string, id: string) => {
    setAllTasks({
      ...allTasks,
      [todoListId]: [
        ...allTasks[todoListId].filter((task: TaskType) => task.id !== id),
      ],
    });
  };

  const deleteTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter((tl: TodoListType) => tl.id !== todoListId));
    delete allTasks[todoListId];
    setAllTasks({ ...allTasks });
  };

  const addTask = (title: string, todoListId: string) => {
    setAllTasks({
      ...allTasks,
      [todoListId]: [
        ...allTasks[todoListId],
        { id: v1(), title, isDone: false },
      ],
    });
  };

  const addTodoList = (title: string) => {
    const TodoListId: string = v1();
    setAllTasks({ ...allTasks, [TodoListId]: [] });
    setTodoLists([...todoLists, { title, id: TodoListId, filter: "all" }]);
  };

  const setChecked = (id: string, todoListId: string) => {
    setAllTasks({
      ...allTasks,
      [todoListId]: [
        ...allTasks[todoListId].map((task: TaskType) => {
          if (task.id === id) {
            return {
              ...task,
              isDone: !task.isDone,
            };
          }
          return task;
        }),
      ],
    });
  };

  const setFilter = (filter: FilterType, todoListId: string) => {
    const filteredTodoLists = todoLists.map((tl: TodoListType) => {
      if (tl.id === todoListId) {
        return { ...tl, filter };
      }
      return { ...tl };
    });
    setTodoLists(filteredTodoLists);
  };

  const changeTask = (title: string, todoListId: string, id: string) => {

    setAllTasks({
      ...allTasks,
      [todoListId]: [
        ...allTasks[todoListId].map((task: TaskType) => {
          if (task.id === id) {
            task.title = title;
          }
          return task;
        }),
      ],
    });
  };

  const changeTitle = (title: string, todoListId: string) => {

   setTodoLists([...todoLists.map((tl: TodoListType) => {
    if (tl.id === todoListId){
      tl.title = title
    }
    return tl
   })])
  };

  return (
    <div className="App">
      <CreateTodo addTodoList={addTodoList} />
      {todoLists.map((tl: TodoListType) => {
        let filteredTasks = allTasks[tl.id];

        if (tl.filter === "active") {
          filteredTasks = filteredTasks.filter((task) => !task.isDone);
        }
        if (tl.filter === "completed") {
          filteredTasks = filteredTasks.filter((task) => task.isDone);
        }

        return (
          <Todolist
          changeTitle={changeTitle}
            changeTask={changeTask}
            deleteTodoList={deleteTodoList}
            setChecked={setChecked}
            deleteTask={deleteTask}
            addTask={addTask}
            tasks={filteredTasks}
            setFilter={setFilter}
            key={tl.id}
            id={tl.id}
            title={tl.title}
            filter={tl.filter}
          />
        );
      })}
    </div>
  );
}

export type CreateTodoPropsType = {
  addTodoList: (title: string) => void;
};
export type CreateTodoFormType = {
  todo: string;
};

const CreateTodo: React.FC<CreateTodoPropsType> = ({ addTodoList }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateTodoFormType>();

  const submit = (data: CreateTodoFormType) => {
    if (data.todo.trim()) {
      addTodoList(data.todo);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <TextField error={!!errors.todo} {...register("todo", { required: true })} />
      <Button type="submit" ><AddIcon/></Button>
    </form>
  );
};

export default App;
