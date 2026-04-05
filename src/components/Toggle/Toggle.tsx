import { Switch } from "@heroui/react";

// ─── Design reference ─────────────────────────────────────────────────────────
// Figma: Components → Toggle
// Size: 44 × 24 px, border-radius: 100px (pill)
// On:  bg #007aff, thumb at right (left: 24px)
// Off: bg #e5e5e5, thumb at left  (left: 4px)
// Thumb: 16 × 16 px, white circle
// ─────────────────────────────────────────────────────────────────────────────

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  labelPlacement?: "left" | "right";
  isDisabled?: boolean;
  className?: string;
}

export function Toggle({
  checked = false,
  onChange,
  label,
  labelPlacement = "right",
  isDisabled = false,
  className = "",
}: ToggleProps) {
  return (
    <Switch
      isSelected={checked}
      onValueChange={onChange}
      isDisabled={isDisabled}
      classNames={{
        base: [
          "inline-flex items-center gap-2",
          labelPlacement === "left" ? "flex-row-reverse" : "flex-row",
          className,
        ].join(" "),
        wrapper: [
          // Track: 44×24 px pill — matches Figma exactly
          "w-11 h-6 rounded-full p-0 transition-colors",
          "group-data-[selected=true]:bg-[#007aff]",
          "group-data-[selected=false]:bg-[#e5e5e5]",
          // Remove HeroUI default colours
          "!bg-none",
          checked ? "!bg-[#007aff]" : "!bg-[#e5e5e5]",
        ].join(" "),
        thumb: [
          // Thumb: 16×16 px white circle
          "size-4 bg-white rounded-full shadow-sm",
          "group-data-[selected=true]:translate-x-[20px]",
          "group-data-[selected=false]:translate-x-1",
          "transition-transform duration-200",
        ].join(" "),
      }}
    >
      {label && (
        <span
          className="text-sm text-[#333333] select-none"
          style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
        >
          {label}
        </span>
      )}
    </Switch>
  );
}

export default Toggle;
