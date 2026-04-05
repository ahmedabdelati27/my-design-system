import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "On/off switch. Dimensions 44×24 px (pill). **On** state: blue track #007aff, thumb slides right. **Off** state: gray track #e5e5e5, thumb slides left. Thumb is a 16×16 px white circle. Wraps HeroUI `Switch`.",
      },
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the toggle is on",
      table: { defaultValue: { summary: "false" } },
    },
    label: {
      control: "text",
      description: "Optional text label",
    },
    labelPlacement: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the label relative to the toggle",
      table: { defaultValue: { summary: "right" } },
    },
    isDisabled: {
      control: "boolean",
      description: "Disables interaction",
      table: { defaultValue: { summary: "false" } },
    },
    onChange: { action: "changed" },
  },
  args: {
    checked: false,
    label: "تفعيل",
    labelPlacement: "right",
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

// ─── Playground ───────────────────────────────────────────────────────────────
export const Playground: Story = { name: "Playground" };

// ─── States ───────────────────────────────────────────────────────────────────
export const Off: Story = {
  name: "State / Off",
  args: { checked: false, label: "إيقاف — Off" },
  parameters: {
    docs: { description: { story: "Gray track, thumb on left. Figma: _Active=No_." } },
  },
};

export const On: Story = {
  name: "State / On",
  args: { checked: true, label: "تشغيل — On" },
  parameters: {
    docs: { description: { story: "Blue track #007aff, thumb on right. Figma: _Active=Yes_." } },
  },
};

export const Disabled: Story = {
  name: "State / Disabled",
  args: { checked: false, isDisabled: true, label: "معطّل — Disabled" },
};

export const DisabledOn: Story = {
  name: "State / Disabled + On",
  args: { checked: true, isDisabled: true, label: "معطّل + مفعّل" },
};

// ─── Label placement ──────────────────────────────────────────────────────────
export const LabelLeft: Story = {
  name: "Label Left",
  args: { checked: true, label: "تفعيل الإشعارات", labelPlacement: "left" },
  parameters: {
    docs: { description: { story: "Label rendered to the left of the track (common in settings UIs)." } },
  },
};

// ─── Interactive ──────────────────────────────────────────────────────────────
export const Interactive: Story = {
  name: "Interactive",
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [on, setOn] = useState(false);
    return (
      <div className="flex flex-col gap-2 items-start">
        <Toggle checked={on} onChange={setOn} label={on ? "مفعّل" : "معطّل"} />
        <p className="text-sm text-[#666]" style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}>
          الحالة: <strong>{on ? "تشغيل" : "إيقاف"}</strong>
        </p>
      </div>
    );
  },
};

// ─── All States ───────────────────────────────────────────────────────────────
export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex flex-col gap-4">
      <Toggle checked={false} label="إيقاف — Off" />
      <Toggle checked={true}  label="تشغيل — On" />
      <Toggle checked={false} label="معطّل — Disabled"     isDisabled />
      <Toggle checked={true}  label="معطّل + مفعّل — Disabled On" isDisabled />
    </div>
  ),
};

// ─── Usage example ────────────────────────────────────────────────────────────
export const UsageExample: Story = {
  name: "Usage Example — Settings List",
  parameters: {
    docs: { description: { story: "A typical settings panel with multiple toggles." } },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [settings, setSettings] = useState({ notifications: true, darkMode: false, sound: true });
    const toggle = (key: keyof typeof settings) =>
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

    const items = [
      { key: "notifications" as const, label: "الإشعارات" },
      { key: "darkMode"       as const, label: "الوضع الداكن" },
      { key: "sound"          as const, label: "الأصوات" },
    ];

    return (
      <div
        className="w-72 rounded-lg border border-[#e5e5e5] divide-y divide-[#e5e5e5] overflow-hidden"
        style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
      >
        {items.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between px-4 py-3">
            <Toggle
              checked={settings[key]}
              onChange={() => toggle(key)}
              labelPlacement="left"
              label={label}
            />
          </div>
        ))}
      </div>
    );
  },
};
