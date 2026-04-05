import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

// ─── Icon helpers ─────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" strokeLinecap="round" />
  </svg>
);
const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
  </svg>
);

// ─── Meta ─────────────────────────────────────────────────────────────────────
const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Text field component. Five states match the Figma spec: **Default**, **Active** (focused), **Error**, **Disabled**, and **Flag** (phone input with country code). Supports label, helper text, and leading/trailing icons.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label rendered above the input (B1/Medium — 16px)",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when empty (B2/Regular — 14px, color: #b3b3b3)",
    },
    helperText: {
      control: "text",
      description: "Helper text below the input (right side in RTL)",
    },
    helperTextEnd: {
      control: "text",
      description: "Secondary helper text on the opposite side",
    },
    isInvalid: {
      control: "boolean",
      description: "Error state — red border + red helper text",
      table: { defaultValue: { summary: "false" } },
    },
    errorMessage: {
      control: "text",
      description: "Error message shown when isInvalid=true",
    },
    isDisabled: {
      control: "boolean",
      description: "Disabled state — gray bg, muted text, no interaction",
      table: { defaultValue: { summary: "false" } },
    },
    isPhoneInput: {
      control: "boolean",
      description: "Flag variant — shows country code prefix (Figma: Type=Flag)",
      table: { defaultValue: { summary: "false" } },
    },
    phoneCode: {
      control: "text",
      description: "Country calling code shown in the Flag variant",
      table: { defaultValue: { summary: "+966" } },
    },
  },
  args: {
    label: "اسم الحقل",
    placeholder: "أدخل اسم الحقل",
    helperText: "نص إضافي",
    helperTextEnd: "نص إضافي",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ─── Playground ───────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "Playground",
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// ─── States ───────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: "State / Default",
  args: {},
  parameters: {
    docs: { description: { story: "Resting state. bg #fafafa, border #e5e5e5. Maps to Figma _Type=Default_." } },
  },
  decorators: [(S) => <div className="w-96"><S /></div>],
};

export const Active: Story = {
  name: "State / Active (Focused)",
  parameters: {
    docs: { description: { story: "Focused — white bg, blue border #007aff. Maps to Figma _Type=Active_." } },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [val, setVal] = useState("نص مدخل");
    return (
      <div className="w-96">
        <Input
          label="اسم الحقل"
          placeholder="أدخل اسم الحقل"
          value={val}
          onChange={setVal}
          helperText="نص إضافي"
          helperTextEnd="نص إضافي"
        />
      </div>
    );
  },
};

export const ErrorState: Story = {
  name: "State / Error",
  args: {
    isInvalid: true,
    errorMessage: "هذا الحقل مطلوب",
    helperTextEnd: "نص إضافي",
  },
  parameters: {
    docs: { description: { story: "Invalid — white bg, red border #ff4e64, red helper text. Maps to Figma _Type=Error_." } },
  },
  decorators: [(S) => <div className="w-96"><S /></div>],
};

export const DisabledState: Story = {
  name: "State / Disabled",
  args: { isDisabled: true },
  parameters: {
    docs: { description: { story: "Disabled — bg #e5e5e5, text #999, no interaction. Maps to Figma _Type=Disabled_." } },
  },
  decorators: [(S) => <div className="w-96"><S /></div>],
};

export const FlagVariant: Story = {
  name: "State / Flag (Phone Input)",
  args: {
    label: "رقم الجوال",
    placeholder: "أدخل رقم الجوال",
    isPhoneInput: true,
    phoneCode: "+966",
    type: "tel",
  },
  parameters: {
    docs: { description: { story: "Phone input with Saudi flag + country code prefix. Maps to Figma _Type=Flag_." } },
  },
  decorators: [(S) => <div className="w-96"><S /></div>],
};

// ─── With Icons ───────────────────────────────────────────────────────────────
export const WithIcons: Story = {
  name: "With Icons",
  parameters: {
    docs: { description: { story: "Icons passed via `leadingIcon` (end/right) and `trailingIcon` (start/left) slots." } },
  },
  render: () => (
    <div className="w-96 flex flex-col gap-4">
      <Input
        label="البحث"
        placeholder="ابحث هنا..."
        trailingIcon={<SearchIcon />}
      />
      <Input
        label="كلمة المرور"
        placeholder="أدخل كلمة المرور"
        type="password"
        leadingIcon={<LockIcon />}
      />
    </div>
  ),
};

// ─── All States ───────────────────────────────────────────────────────────────
export const AllStates: Story = {
  name: "All States",
  parameters: {
    layout: "padded",
    docs: { description: { story: "All five Figma states side by side." } },
  },
  render: () => (
    <div className="flex flex-col gap-6 w-[420px]">
      <Input label="الافتراضي — Default"   placeholder="أدخل اسم الحقل" helperText="نص إضافي" helperTextEnd="نص إضافي" />
      <Input label="معطّل — Disabled"       placeholder="أدخل اسم الحقل" isDisabled helperText="نص إضافي" helperTextEnd="نص إضافي" />
      <Input label="خطأ — Error"            placeholder="أدخل اسم الحقل" isInvalid errorMessage="هذا الحقل مطلوب" helperTextEnd="نص إضافي" />
      <Input label="رقم الجوال — Flag"     placeholder="أدخل رقم الجوال" isPhoneInput phoneCode="+966" type="tel" helperText="نص إضافي" helperTextEnd="نص إضافي" />
    </div>
  ),
};

// ─── Usage Example ────────────────────────────────────────────────────────────
export const UsageExample: Story = {
  name: "Usage Example — Login Form",
  parameters: {
    docs: { description: { story: "Typical login form with email, password, and error feedback." } },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password, setPassword] = useState("");
    const emailInvalid = email.length > 0 && !email.includes("@");

    return (
      <div className="w-80 flex flex-col gap-5">
        <Input
          label="البريد الإلكتروني"
          placeholder="example@email.com"
          value={email}
          onChange={setEmail}
          isInvalid={emailInvalid}
          errorMessage="بريد إلكتروني غير صحيح"
          type="email"
        />
        <Input
          label="كلمة المرور"
          placeholder="أدخل كلمة المرور"
          value={password}
          onChange={setPassword}
          type="password"
          leadingIcon={<LockIcon />}
        />
      </div>
    );
  },
};
