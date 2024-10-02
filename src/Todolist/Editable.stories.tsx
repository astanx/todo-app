import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Provider } from "react-redux";
import store from "../state/store";
import { Editable } from "./Editable";
const meta: Meta = {
  title: "Example/Editable",
  component: Editable,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    title: "editable",
    id: "myId",
    changeItem: fn(),
    deleteItem: fn(),
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
export const EditableStory: Story = {};
