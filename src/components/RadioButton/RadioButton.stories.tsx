import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioButton } from "./RadioButton";

const meta: Meta<typeof RadioButton> = {
  title: "Components/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Single radio button control. Two states from the Figma spec: **inactive** (white + gray border) and **active** (white + thick blue inner fill via box-shadow). Fully accessible via a hidden `<input type='radio'>`. For grouped usage wrap multiple `RadioButton` components sharing the same `name`.",
      },
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether this radio is selected",
      table: { defaultValue: { summary: "false" } },
    },
    label: {
      control: "text",
      description: "Visible text label",
    },
    isDisabled: {
      control: "boolean",
      description: "Disables interaction and dims the control",
      table: { defaultValue: { summary: "false" } },
    },
    onChange: { action: "changed" },
  },
  args: {
    label: "خيار",
    checked: false,
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

// ─── Playground ───────────────────────────────────────────────────────────────
export const Playground: Story = { name: "Playground" };

// ─── States ───────────────────────────────────────────────────────────────────
export const Inactive: Story = {
  name: "State / Inactive",
  args: { checked: false, label: "غير محدد" },
  parameters: {
    docs: { description: { story: "Default — white bg, 1px gray border #e5e5e5. Figma: _Active=No_." } },
  },
};

export const Active: Story = {
  name: "State / Active",
  args: { checked: true, label: "محدد" },
  parameters: {
    docs: { description: { story: "Selected — white bg, thick blue inner circle via box-shadow. Figma: _Active=Yes_." } },
  },
};

export const Disabled: Story = {
  name: "State / Disabled",
  args: { checked: false, isDisabled: true, label: "معطّل" },
};

export const DisabledChecked: Story = {
  name: "State / Disabled + Checked",
  args: { checked: true, isDisabled: true, label: "معطّل ومحدد" },
};

// ─── Group ────────────────────────────────────────────────────────────────────
export const RadioGroup: Story = {
  name: "Usage — Radio Group",
  parameters: {
    docs: {
      description: {
        story: "Wrap multiple `RadioButton` components with the same `name` to create a mutually exclusive group.",
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState("a");
    const options = [
      { value: "a", label: "خيار أول" },
      { value: "b", label: "خيار ثاني" },
      { value: "c", label: "خيار ثالث" },
    ];
    return (
      <div className="flex flex-col gap-3">
        {options.map((o) => (
          <RadioButton
            key={o.value}
            id={`group-${o.value}`}
            name="demo-group"
            value={o.value}
            label={o.label}
            checked={selected === o.value}
            onChange={() => setSelected(o.value)}
          />
        ))}
      </div>
    );
  },
};

// ─── All States ───────────────────────────────────────────────────────────────
export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex flex-col gap-3">
      <RadioButton label="غير محدد — Inactive"        checked={false} id="s1" />
      <RadioButton label="محدد — Active"               checked={true}  id="s2" />
      <RadioButton label="معطّل — Disabled"            checked={false} id="s3" isDisabled />
      <RadioButton label="معطّل ومحدد — Disabled+On"  checked={true}  id="s4" isDisabled />
    </div>
  ),
};
