import { useState, useId } from "react";

// ─── Design reference (Figma: eUQT666LyyPclXiU0NxTRH node 35:49760) ──────────
//
// Layout (RTL, dir="rtl"):
//   [Label — 16px Medium #333, full-width, ABOVE the field]
//   [Icon ←] [placeholder / value — flex-1, text-right] [Icon ←]
//   [helper-right              helper-left]
//
// States       bg          border
//   Default    #fafafa     #e5e5e5
//   Active     #ffffff     #007aff   (focus)
//   Error      #ffffff     #ff4e64
//   Disabled   #e5e5e5     none
//
// Flag variant: PhonePrefix replaces the right-side icon
//   [🇸🇦 +966 │] [placeholder — flex-1] [Icon ←]
//
// Typography:
//   Label       IBM Plex Sans Arabic Medium  16px  lh 1.2   #333333
//   Placeholder IBM Plex Sans Arabic Regular 14px  lh 1.2   #b3b3b3
//   Helper      IBM Plex Sans Arabic Regular 14px  lh 1.2   #666666
//   Error msg   IBM Plex Sans Arabic Regular 14px  lh 1.2   #ff4e64
// ─────────────────────────────────────────────────────────────────────────────

export type InputVariant = "default" | "active" | "error" | "disabled" | "flag";

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  /** Red border + red helper text */
  isInvalid?: boolean;
  /** Error message shown on the RIGHT side below the input (RTL start) */
  errorMessage?: string;
  isDisabled?: boolean;
  /** Helper text on the RIGHT side (RTL start — primary helper) */
  helperText?: string;
  /** Helper text on the LEFT side (RTL end — secondary helper) */
  helperTextEnd?: string;
  /** Flag/phone variant — replaces the right icon with country code prefix */
  isPhoneInput?: boolean;
  /** Country code shown in Flag variant */
  phoneCode?: string;
  /** Icon on the LEFT side of the input field */
  leadingIcon?: React.ReactNode;
  /** Icon on the RIGHT side of the input field */
  trailingIcon?: React.ReactNode;
  type?: string;
  name?: string;
  id?: string;
  className?: string;
}

// ─── Default arrow-left icon (matches Figma placeholder icon) ─────────────────
function ArrowIcon({ color }: { color: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="M11 18l-6-6 6-6" />
    </svg>
  );
}

// ─── Phone prefix (Flag variant) ──────────────────────────────────────────────
// Placed on the RIGHT side (RTL start), separated by a vertical divider.
function PhonePrefix({ code }: { code: string }) {
  return (
    <div className="flex items-center gap-1 h-full pl-2 border-l border-[#ebebec] shrink-0">
      <span className="text-base leading-none" aria-label="Saudi Arabia">
        🇸🇦
      </span>
      <span className="text-xs text-[#999999]">{code}</span>
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
export function Input({
  label,
  placeholder = "أدخل اسم الحقل",
  value,
  onChange,
  isInvalid = false,
  errorMessage,
  isDisabled = false,
  helperText,
  helperTextEnd,
  isPhoneInput = false,
  phoneCode = "+966",
  leadingIcon,
  trailingIcon,
  type = "text",
  name,
  id: externalId,
  className = "",
}: InputProps) {
  const autoId = useId();
  const id = externalId ?? autoId;
  const [focused, setFocused] = useState(false);

  // ── Icon colours ────────────────────────────────────────────────────────────
  const iconColor = isDisabled ? "#b3b3b3" : "#666666";
  const defaultIcon = <ArrowIcon color={iconColor} />;

  // ── Input-box border / background ───────────────────────────────────────────
  const boxClass = isDisabled
    ? "bg-[#e5e5e5] border-transparent cursor-not-allowed"
    : isInvalid
    ? "bg-white border-[#ff4e64]"
    : focused
    ? "bg-white border-[#007aff]"
    : "bg-[#fafafa] border-[#e5e5e5] hover:border-[#007aff]";

  // ── Helper / error text colour ───────────────────────────────────────────────
  const helperColor = isInvalid ? "text-[#ff4e64]" : "text-[#666666]";
  const showHelper =
    helperText || helperTextEnd || (isInvalid && errorMessage);

  return (
    <div
      dir="rtl"
      className={`flex flex-col gap-3 w-full ${className}`}
      style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
    >
      {/* ── Label — always ABOVE the field ─────────────────────────────────── */}
      {label && (
        <label
          htmlFor={id}
          className="w-full text-right text-base font-medium leading-[1.2] text-[#333333]"
        >
          {label}
        </label>
      )}

      <div className="flex flex-col gap-2 w-full">
        {/* ── Input box ───────────────────────────────────────────────────── */}
        {/*
            RTL flex row — children render right → left:
              1st child  →  RIGHT side of the field
              2nd child  →  middle (flex-1)
              3rd child  →  LEFT side of the field
        */}
        <div
          className={[
            "flex items-center gap-2 h-14 px-4 rounded-lg border transition-colors w-full",
            boxClass,
          ].join(" ")}
        >
          {/* RIGHT side ─ trailing icon OR phone prefix */}
          {isPhoneInput ? (
            <PhonePrefix code={phoneCode} />
          ) : (
            <span className="shrink-0 flex items-center">
              {trailingIcon ?? defaultIcon}
            </span>
          )}

          {/* Native input — RTL, right-aligned text ─────────────────────── */}
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            disabled={isDisabled}
            placeholder={placeholder}
            dir="rtl"
            autoComplete="off"
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={[
              "flex-1 min-w-0 bg-transparent outline-none",
              "text-sm text-right leading-[1.2]",
              "placeholder:text-[#b3b3b3]",
              isDisabled
                ? "text-[#999999] cursor-not-allowed"
                : "text-[#333333]",
            ].join(" ")}
          />

          {/* LEFT side ─ leading icon */}
          <span className="shrink-0 flex items-center">
            {leadingIcon ?? defaultIcon}
          </span>
        </div>

        {/* ── Helper / error row — both sides ────────────────────────────── */}
        {/*
            RTL justify-between:
              first child  →  RIGHT side
              last child   →  LEFT side
        */}
        {showHelper && (
          <div
            className={[
              "flex items-center justify-between",
              "text-sm leading-[1.2]",
              helperColor,
            ].join(" ")}
          >
            {/* RIGHT side (RTL start) — primary / error message */}
            <span>{isInvalid ? errorMessage : helperText}</span>
            {/* LEFT side (RTL end) — secondary */}
            <span>{helperTextEnd}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
