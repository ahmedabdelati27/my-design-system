// ─── Design reference (Figma: eUQT666LyyPclXiU0NxTRH node 35:49835) ──────────
//
// Track:  44 × 24 px, border-radius 100px (full pill), overflow hidden
// Thumb:  16 × 16 px white circle, absolutely centered vertically
//   Off → left: 4px
//   On  → left: 24px
//
// Colours:
//   On  → track bg #007aff
//   Off → track bg #e5e5e5
//
// The Figma renders this as a plain <button> with an absolutely positioned
// white circle — no extra borders, shadows, or decorations.
// ─────────────────────────────────────────────────────────────────────────────

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  /** Which side the label appears on relative to the track */
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
  const handleClick = () => {
    if (!isDisabled) onChange?.(!checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  const track = (
    // Track — exactly 44×24 px, pill shape
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={isDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={[
        // Exact Figma dimensions
        "relative inline-block w-[44px] h-[24px]",
        "rounded-[100px] overflow-hidden",
        // Track colour
        checked ? "bg-[#007aff]" : "bg-[#e5e5e5]",
        // Transition
        "transition-colors duration-200",
        // Disabled
        isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        // Reset browser button styles
        "border-0 p-0 outline-none focus-visible:ring-2 focus-visible:ring-[#007aff] focus-visible:ring-offset-2",
      ].join(" ")}
    >
      {/* Thumb — 16×16 px white circle, slides horizontally */}
      <span
        aria-hidden="true"
        className={[
          // Exact Figma thumb size
          "absolute top-1/2 -translate-y-1/2",
          "w-[16px] h-[16px] rounded-full bg-white",
          // Position: Off=4px, On=24px (matches Figma left values exactly)
          checked ? "left-[24px]" : "left-[4px]",
          "transition-[left] duration-200 ease-in-out",
        ].join(" ")}
      />
    </button>
  );

  if (!label) return <>{track}</>;

  return (
    <div
      className={[
        "inline-flex items-center gap-2",
        labelPlacement === "left" ? "flex-row-reverse" : "flex-row",
        isDisabled ? "opacity-50" : "",
        className,
      ].join(" ")}
      style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
    >
      {track}
      <span className="text-sm text-[#333333] select-none leading-[1.2]">
        {label}
      </span>
    </div>
  );
}

export default Toggle;
