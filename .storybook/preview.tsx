import React from "react";
import type { Preview, Decorator } from "@storybook/react";
import { HeroUIProvider } from "@heroui/react";
import "../src/index.css";

const withProviders: Decorator = (Story, context) => {
  const dir = (context.globals?.direction as string) ?? "rtl";
  return (
    <HeroUIProvider>
      <div
        dir={dir}
        style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif', padding: "1.5rem" }}
      >
        <Story />
      </div>
    </HeroUIProvider>
  );
};

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light",   value: "#ffffff" },
        { name: "surface", value: "#fafafa" },
        { name: "dark",    value: "#191919" },
      ],
    },
    layout: "centered",
  },
  globalTypes: {
    direction: {
      name: "Direction",
      description: "Text direction",
      defaultValue: "rtl",
      toolbar: {
        icon: "globe",
        items: [
          { value: "rtl", title: "RTL (Arabic)" },
          { value: "ltr", title: "LTR" },
        ],
      },
    },
  },
};

export default preview;
