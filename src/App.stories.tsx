import type { Meta, StoryObj } from "@storybook/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./state/store";

const meta: Meta = {
  title: "Example/App",
  component: App,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
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
export const AppStorie: Story = {};
