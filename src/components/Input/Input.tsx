import { Input as HeroInput } from "@heroui/react";
import type { InputProps as HeroInputProps } from "@heroui/react";

// ─── Design reference ─────────────────────────────────────────────────────────
// Figma: Components → Text Fields
// States: Default, Active (focused), Error, Disabled, Flag (phone + country code)
// Height: 56px, border-radius: 8px, padding: 16px
// Label: IBM Plex Sans Arabic Medium 16px #333333
// Placeholder: 14px Regular #b3b3b3
// Helper text: 14px Regular #666666
// Error text: 14px Regular #ff4e64
// ─────────────────────────────────────────────────────────────────────────────

export type InputVariant = "default" | "active" | "error" | "disabled" | "flag";

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  /** Shows error ring + red helper text */
  isInvalid?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  /** Helper text shown below the input */
  helperText?: string;
  /** Secondary helper text shown on the opposite side (right) */
  helperTextEnd?: string;
  /** Flag/phone variant — shows country code prefix */
  isPhoneInput?: boolean;
  /** Country calling code shown in Flag variant, e.g. "+966" */
  phoneCode?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  type?: string;
  name?: string;
  className?: string;
}

// Country code prefix shown in the Flag variant
function PhonePrefix({ code }: { code: string }) {
  return (
    <div
      className="flex items-center gap-1 pr-2 border-r border-[#e5e5e5] h-full"
      style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
    >
      {/* Saudi flag emoji — swap for an <img> when a real flag asset is available */}
      <span className="text-base leading-none">🇸🇦</span>
      <span className="text-xs text-[#999999]">{code}</span>
    </div>
  );
}

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
  className = "",
}: InputProps) {
  const baseFont = { fontFamily: '"IBM Plex Sans Arabic", sans-serif' };

  // Shared classNames fed into HeroUI's classNames API
  const classNames: HeroInputProps["classNames"] = {
    base: "w-full",
    label: [
      "text-[#333333] font-medium text-base",
      "!transform-none !translate-y-0 !scale-100",
      "static mb-1 pb-0",
    ].join(" "),
    inputWrapper: [
      "h-14 rounded-lg px-4 shadow-none border transition-colors",
      // State-based background & border
      isDisabled
        ? "bg-[#e5e5e5] border-[#e5e5e5] cursor-not-allowed"
        : isInvalid
        ? "bg-white border-[#ff4e64] hover:border-[#ff4e64] focus-within:border-[#ff4e64]"
        : "bg-[#fafafa] border-[#e5e5e5] hover:border-[#007aff] focus-within:bg-white focus-within:border-[#007aff]",
    ].join(" "),
    input: [
      "text-sm text-right",
      "placeholder:text-[#b3b3b3]",
      isDisabled ? "text-[#999999]" : "text-[#333333]",
    ].join(" "),
    helperWrapper: "flex flex-row-reverse justify-between pt-1 px-0",
    description: "text-sm text-[#666666]",
    errorMessage: "text-sm text-[#ff4e64]",
  };

  return (
    <div className={`w-full ${className}`} style={baseFont}>
      <HeroInput
        label={label}
        labelPlacement="outside"
        placeholder={placeholder}
        value={value}
        onValueChange={onChange}
        isInvalid={isInvalid}
        errorMessage={
          isInvalid
            ? (errorMessage && (
                <span className="flex items-center justify-between w-full">
                  <span>{helperTextEnd}</span>
                  <span>{errorMessage}</span>
                </span>
              )) ||
              errorMessage
            : undefined
        }
        isDisabled={isDisabled}
        description={
          !isInvalid && (helperText || helperTextEnd) ? (
            <span className="flex items-center justify-between w-full">
              <span>{helperTextEnd}</span>
              <span>{helperText}</span>
            </span>
          ) : undefined
        }
        type={type}
        name={name}
        dir="rtl"
        startContent={
          isPhoneInput ? (
            <PhonePrefix code={phoneCode} />
          ) : leadingIcon ? (
            <span className="shrink-0 text-[#666666]">{leadingIcon}</span>
          ) : undefined
        }
        endContent={
          trailingIcon ? (
            <span className="shrink-0 text-[#666666]">{trailingIcon}</span>
          ) : undefined
        }
        classNames={classNames}
        style={baseFont}
      />
    </div>
  );
}

export default Input;
