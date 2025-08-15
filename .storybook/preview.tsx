// .storybook/preview.tsx
import React from "react";
import type { Preview, Decorator } from "@storybook/react";
import { ErrorProvider } from "../src/context/ErrorContext";

import "../src/index.css";

const withErrorProvider: Decorator = (Story) => (
  <ErrorProvider>
    <Story />
  </ErrorProvider>
);

const preview: Preview = {
  decorators: [withErrorProvider],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
