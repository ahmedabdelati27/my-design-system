import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Checkbox control. 24×24 px, 2px border-radius. **Off**: white bg, 1px gray border #e5e5e5. **On**: blue bg #007aff, white checkmark. Wraps HeroUI `Checkbox` with token overrides.",
      },
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
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
    isIndeterminate: {
      control: "boolean",
      description: "Indeterminate / partial-selection state",
      table: { defaultValue: { summary: "false" } },
    },
    onChange: { action: "changed" },
  },
  args: {
    label: "أوافق على الشروط",
    checked: false,
    isDisabled: false,
    isIndeterminate: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ─── Playground ───────────────────────────────────────────────────────────────
export const Playground: Story = { name: "Playground" };

// ─── States ───────────────────────────────────────────────────────────────────
export const Unchecked: Story = {
  name: "State / Off (Unchecked)",
  args: { checked: false, label: "غير محدد — Off" },
  parameters: {
    docs: { description: { story: "Default — white bg, 1px border #e5e5e5. Figma: _Property 1=off_." } },
  },
};

export const Checked: Story = {
  name: "State / On (Checked)",
  args: { checked: true, label: "محدد — On" },
  parameters: {
    docs: { description: { story: "Checked — blue bg #007aff, white checkmark. Figma: _Property 1=on_." } },
  },
};

export const Indeterminate: Story = {
  name: "State / Indeterminate",
  args: { isIndeterminate: true, label: "محدد جزئياً" },
  parameters: {
    docs: { description: { story: "Indeterminate / parent node of a partially checked group." } },
  },
};

export const Disabled: Story = {
  name: "State / Disabled",
  args: { checked: false, isDisabled: true, label: "معطّل — Disabled" },
};

export const DisabledChecked: Story = {
  name: "State / Disabled + Checked",
  args: { checked: true, isDisabled: true, label: "معطّل ومحدد" },
};

// ─── Interactive ──────────────────────────────────────────────────────────────
export const Interactive: Story = {
  name: "Interactive",
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [v, setV] = useState(false);
    return (
      <div className="flex flex-col gap-2">
        <Checkbox checked={v} onChange={setV} label="أوافق على الشروط والأحكام" />
        <p className="text-sm text-[#666]" style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}>
          الحالة: <strong>{v ? "محدد" : "غير محدد"}</strong>
        </p>
      </div>
    );
  },
};

// ─── All States ───────────────────────────────────────────────────────────────
export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox checked={false}          label="غير محدد — Unchecked" />
      <Checkbox checked={true}           label="محدد — Checked" />
      <Checkbox isIndeterminate          label="محدد جزئياً — Indeterminate" />
      <Checkbox checked={false} isDisabled label="معطّل — Disabled" />
      <Checkbox checked={true}  isDisabled label="معطّل ومحدد — Disabled + Checked" />
    </div>
  ),
};

// ─── Usage Example ────────────────────────────────────────────────────────────
export const UsageExample: Story = {
  name: "Usage Example — Permissions List",
  parameters: {
    docs: {
      description: {
        story: "A permissions checklist where a parent checkbox controls a group via indeterminate state.",
      },
    },
  },
  render: () => {
    const permissions = [
      { key: "read",   label: "قراءة البيانات" },
      { key: "write",  label: "كتابة البيانات" },
      { key: "delete", label: "حذف البيانات" },
    ] as const;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<Set<string>>(new Set(["read"]));

    const toggle = (key: string) =>
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(key) ? next.delete(key) : next.add(key);
        return next;
      });

    const allChecked = selected.size === permissions.length;
    const someChecked = selected.size > 0 && !allChecked;

    const toggleAll = () =>
      setSelected(allChecked ? new Set() : new Set(permissions.map((p) => p.key)));

    return (
      <div
        className="w-64 flex flex-col gap-3 p-4 rounded-lg border border-[#e5e5e5]"
        style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
      >
        <Checkbox
          checked={allChecked}
          isIndeterminate={someChecked}
          onChange={toggleAll}
          label="تحديد الكل"
        />
        <div className="flex flex-col gap-2 pr-4 border-r border-[#e5e5e5]">
          {permissions.map(({ key, label }) => (
            <Checkbox
              key={key}
              checked={selected.has(key)}
              onChange={() => toggle(key)}
              label={label}
            />
          ))}
        </div>
      </div>
    );
  },
};
