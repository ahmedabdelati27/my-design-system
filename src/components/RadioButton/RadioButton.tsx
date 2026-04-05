import { useRef } from "react";

// ─── Design reference ─────────────────────────────────────────────────────────
// Figma: Components → Radio Button
// Size: 24 × 24 px, border-radius: 50% (fully rounded)
// Inactive: white bg, 1px border #e5e5e5
// Active:   white bg, thick blue border #007aff (inner filled circle via box-shadow)
// ─────────────────────────────────────────────────────────────────────────────

export interface RadioButtonProps {
  /** Whether this radio is selected */
  checked?: boolean;
  /** Controlled change handler */
  onChange?: (checked: boolean) => void;
  /** Text label rendered to the right of the radio */
  label?: string;
  /** Unique id — required when using a visible label */
  id?: string;
  isDisabled?: boolean;
  name?: string;
  value?: string;
  className?: string;
}

export function RadioButton({
  checked = false,
  onChange,
  label,
  id,
  isDisabled = false,
  name,
  value,
  className = "",
}: RadioButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <label
      htmlFor={id}
      className={[
        "inline-flex items-center gap-2",
        isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      ].join(" ")}
    >
      {/* Hidden native input for a11y / form submission */}
      <input
        ref={inputRef}
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={isDisabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only"
      />

      {/* Custom radio circle */}
      <span
        aria-hidden="true"
        className={[
          // Base: 24×24 circle
          "shrink-0 inline-flex items-center justify-center",
          "size-6 rounded-full border transition-all",
          checked
            ? // Active: blue outer ring + white inner + blue fill via box-shadow
              "border-[#007aff] bg-white shadow-[inset_0_0_0_6px_#007aff]"
            : "border-[#e5e5e5] bg-white",
        ].join(" ")}
      />

      {label && (
        <span
          className="text-sm text-[#333333] select-none"
          style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
        >
          {label}
        </span>
      )}
    </label>
  );
}

export default RadioButton;
