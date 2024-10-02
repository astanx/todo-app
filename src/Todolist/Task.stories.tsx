import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Provider } from "react-redux";
import store from "../state/store";
import { Task } from "./Task";
const meta: Meta = {
  title: "Example/Todolist",
  component: Task,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    task: { id: "taskId", title: "Make Story", isDone: true },
    id: "myId",
    changeTaskTitle: fn(),
    deleteTask: fn(),
    changeChecked: fn(),
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
export const TaskStory: Story = {};
