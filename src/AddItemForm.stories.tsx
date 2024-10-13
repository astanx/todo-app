import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import store from "./state/store";
import { AddItemForm } from "./AddItemForm";
import { fn } from "@storybook/test";

const meta: Meta = {
  title: "Example/AddItemForm",
  component: AddItemForm,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    addItem: fn(),
  },
  decorators: [
    (Story: any) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};
export default meta;
type Story = StoryObj;
export const AddItemFormStory: Story = {};
