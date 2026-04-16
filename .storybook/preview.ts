import type { Preview } from "@storybook/react";
import "../src/styles/base.css";
import "../src/styles/helpers.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    backgrounds: {
      default: "app",
      values: [
        { name: "app", value: "#f3f2ef" },
        { name: "surface", value: "#ffffff" },
        { name: "dark", value: "#1c1c1c" },
      ],
    },
  },
};

export default preview;
