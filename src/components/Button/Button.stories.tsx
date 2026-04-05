import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

// ─── Arrow icons (inline SVG so stories have no asset dependencies) ──────────
const ArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Meta ─────────────────────────────────────────────────────────────────────
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Primary action button. Three visual variants match the Figma spec: **solid** (filled blue), **bordered** (outlined blue), **ghost** (text-only blue). Supports leading/trailing icons and three sizes.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "bordered", "ghost"],
      description: "Visual style of the button",
      table: { defaultValue: { summary: "solid" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Height: sm=40px, md=56px (Figma), lg=64px",
      table: { defaultValue: { summary: "md" } },
    },
    isDisabled: {
      control: "boolean",
      description: "Disables interaction and applies muted styling",
      table: { defaultValue: { summary: "false" } },
    },
    children: {
      control: "text",
      description: "Button label text",
    },
    onClick: { action: "clicked" },
  },
  args: {
    children: "التالي",
    variant: "solid",
    size: "md",
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── Single interactive story (Controls panel) ────────────────────────────────
export const Playground: Story = {
  name: "Playground",
};

// ─── Variants ─────────────────────────────────────────────────────────────────
export const Solid: Story = {
  name: "Variant / Solid (Default)",
  args: { variant: "solid" },
  parameters: {
    docs: { description: { story: "Filled blue — primary CTA. Maps to Figma _Type=Default_." } },
  },
};

export const Bordered: Story = {
  name: "Variant / Bordered (Secondary)",
  args: { variant: "bordered" },
  parameters: {
    docs: { description: { story: "Outlined blue — secondary action. Maps to Figma _Type=Secondary_." } },
  },
};

export const Ghost: Story = {
  name: "Variant / Ghost",
  args: { variant: "ghost" },
  parameters: {
    docs: { description: { story: "Text-only — tertiary / inline action." } },
  },
};

// ─── States ───────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  name: "State / Disabled",
  args: { variant: "solid", isDisabled: true },
  parameters: {
    docs: { description: { story: "Disabled state across all variants. Maps to Figma _Type=Disabled_." } },
  },
};

export const DisabledBordered: Story = {
  name: "State / Disabled (Bordered)",
  args: { variant: "bordered", isDisabled: true },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  name: "All Sizes",
  parameters: {
    docs: { description: { story: "sm (40px) · md (56px — Figma) · lg (64px)" } },
  },
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      <Button size="sm">صغير — Small</Button>
      <Button size="md">متوسط — Medium</Button>
      <Button size="lg">كبير — Large</Button>
    </div>
  ),
};

// ─── With Icons ───────────────────────────────────────────────────────────────
export const WithIcons: Story = {
  name: "With Icons",
  parameters: {
    docs: {
      description: {
        story:
          "Figma shows arrow icons on both sides. Pass `leadingIcon` (right side in RTL) and `trailingIcon` (left side in RTL).",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <Button trailingIcon={<ArrowRight />} leadingIcon={<ArrowLeft />}>
        التالي
      </Button>
      <Button variant="bordered" trailingIcon={<ArrowRight />} leadingIcon={<ArrowLeft />}>
        التالي
      </Button>
      <Button variant="ghost" leadingIcon={<ArrowLeft />}>
        رجوع
      </Button>
    </div>
  ),
};

// ─── All Variants side by side ────────────────────────────────────────────────
export const AllVariants: Story = {
  name: "All Variants",
  parameters: {
    docs: { description: { story: "All three variants + disabled state at a glance." } },
  },
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <Button variant="solid">الافتراضي — Solid</Button>
      <Button variant="bordered">الثانوي — Bordered</Button>
      <Button variant="ghost">شبح — Ghost</Button>
      <Button variant="solid" isDisabled>معطّل — Disabled</Button>
    </div>
  ),
};

// ─── Usage example ────────────────────────────────────────────────────────────
export const UsageExample: Story = {
  name: "Usage Example — Form Actions",
  parameters: {
    docs: {
      description: {
        story: "Typical form footer with a primary submit and a secondary cancel action.",
      },
    },
  },
  render: () => (
    <div className="flex gap-3 w-full max-w-sm">
      <Button variant="solid" className="flex-1">إرسال</Button>
      <Button variant="bordered" className="flex-1">إلغاء</Button>
    </div>
  ),
};
