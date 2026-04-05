import { Checkbox as HeroCheckbox } from "@heroui/react";

// ─── Design reference ─────────────────────────────────────────────────────────
// Figma: Components → Checkbox
// Size: 24 × 24 px, border-radius: 2px
// Off: white bg, 1px border #e5e5e5
// On:  bg #007aff, white checkmark SVG centred
// ─────────────────────────────────────────────────────────────────────────────

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  isDisabled?: boolean;
  isIndeterminate?: boolean;
  id?: string;
  name?: string;
  value?: string;
  className?: string;
}

export function Checkbox({
  checked = false,
  onChange,
  label,
  isDisabled = false,
  isIndeterminate = false,
  id,
  name,
  value,
  className = "",
}: CheckboxProps) {
  return (
    <HeroCheckbox
      id={id}
      name={name}
      value={value}
      isSelected={checked}
      onValueChange={onChange}
      isDisabled={isDisabled}
      isIndeterminate={isIndeterminate}
      classNames={{
        base: `inline-flex items-center gap-2 ${className}`,
        wrapper: [
          // 24×24 px, 2px radius — matches Figma
          "size-6 rounded-sm border transition-colors m-0",
          "before:rounded-sm after:rounded-sm",
          // Off state
          "border-[#e5e5e5] bg-white",
          // On state — HeroUI adds data-selected
          "group-data-[selected=true]:bg-[#007aff]",
          "group-data-[selected=true]:border-[#007aff]",
          // Disabled
          "group-data-[disabled=true]:opacity-50 group-data-[disabled=true]:cursor-not-allowed",
        ].join(" "),
        icon: "text-white w-[10px] h-[8px]",
        label: [
          "text-sm text-[#333333] select-none",
          isDisabled ? "opacity-50" : "",
        ].join(" "),
      }}
      style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
    >
      {label}
    </HeroCheckbox>
  );
}

export default Checkbox;
