import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Todolist from "./Todolist";
import { Provider } from "react-redux";
import store from "../state/store";
const meta: Meta = {
  title: "Example/Todolist",
  component: Todolist,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    id: "todolist-1",
    title: "My Todo List",
    tasks: [],
    addTask: fn(),
    deleteTodoList: fn(),
    changeTitle: fn(),
    deleteTask: fn(),
    changeTask: fn(),
    setChecked: fn(),
    setFilter: fn(),
    filter: "all",
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};
export default meta;
type Story = StoryObj;
export const TodoList: Story = {
  args: {
    tasks: [
      { id: "1", title: "Learn React", isDone: false },
      { id: "2", title: "Write Storybook", isDone: true },
    ],
  },
};
