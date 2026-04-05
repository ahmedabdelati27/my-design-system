import { Button as HeroButton } from "@heroui/react";

// ─── Design reference (Figma: eUQT666LyyPclXiU0NxTRH node 35:49739) ──────────
//
// All three variants show arrow icons on BOTH sides by default.
//
// Layout:  [← icon] [text — SemiBold 16px / 24px] [← icon]
// Sizing:  h=56px, px=16px, gap=8px, border-radius=8px   (md size)
//
// Variant    bg          text       icon
//   solid    #007aff     #ffffff    #ffffff
//   bordered transparent #007aff    #007aff  + border #007aff
//   ghost    transparent #007aff    #007aff  (no border)
//
// Disabled (any variant):
//   bg #e5e5e5, text #b3b3b3, icon #b3b3b3, no border
// ─────────────────────────────────────────────────────────────────────────────

export type ButtonVariant = "solid" | "bordered" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  /** Custom icon for the LEFT side. Pass `null` to hide. */
  leftIcon?: React.ReactNode | null;
  /** Custom icon for the RIGHT side. Pass `null` to hide. */
  rightIcon?: React.ReactNode | null;
  /** @deprecated use leftIcon */
  leadingIcon?: React.ReactNode | null;
  /** @deprecated use rightIcon */
  trailingIcon?: React.ReactNode | null;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

// ─── Default arrow-left icon (matches Figma "vuesax/linear/arrow-left") ───────
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
      className="shrink-0"
    >
      <path d="M19 12H5" />
      <path d="M11 18l-6-6 6-6" />
    </svg>
  );
}

// ─── Icon colour per variant / state ─────────────────────────────────────────
function iconColor(variant: ButtonVariant, isDisabled: boolean): string {
  if (isDisabled) return "#b3b3b3";
  if (variant === "solid") return "#ffffff";
  return "#007aff"; // bordered + ghost
}

// ─── Size tokens ──────────────────────────────────────────────────────────────
const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 gap-1.5 text-sm",
  md: "h-14 px-4 gap-2 text-base",   // 56px — matches Figma
  lg: "h-16 px-6 gap-2.5 text-lg",
};

// ─── Variant tokens ───────────────────────────────────────────────────────────
const variantClasses: Record<ButtonVariant, string> = {
  solid:
    "bg-[#007aff] text-white border-transparent " +
    "hover:bg-[#006fe8] active:bg-[#0057b5]",
  bordered:
    "bg-transparent border border-[#007aff] text-[#007aff] " +
    "hover:bg-[#e6f2ff] active:bg-[#b0d6ff]",
  ghost:
    "bg-transparent border-transparent text-[#007aff] " +
    "hover:bg-[#e6f2ff] active:bg-[#b0d6ff]",
};

const disabledClasses =
  "!bg-[#e5e5e5] !text-[#b3b3b3] !border-transparent cursor-not-allowed";

// ─── Component ────────────────────────────────────────────────────────────────
export function Button({
  children,
  variant = "solid",
  size = "md",
  isDisabled = false,
  leftIcon,
  rightIcon,
  leadingIcon,   // deprecated alias
  trailingIcon,  // deprecated alias
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  // Resolve icon: explicit prop wins over deprecated alias.
  // undefined  → show default arrow
  // null       → hide icon entirely
  // ReactNode  → render that node
  const resolvedLeft  = leftIcon  !== undefined ? leftIcon  : leadingIcon;
  const resolvedRight = rightIcon !== undefined ? rightIcon : trailingIcon;

  const color = iconColor(variant, isDisabled);

  const renderLeft  = resolvedLeft  === null ? null
    : resolvedLeft  ?? <ArrowIcon color={color} />;
  const renderRight = resolvedRight === null ? null
    : resolvedRight ?? <ArrowIcon color={color} />;

  return (
    <HeroButton
      type={type}
      isDisabled={isDisabled}
      onPress={onClick}
      style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
      className={[
        "w-full flex items-center justify-center rounded-lg font-semibold leading-6",
        sizeClasses[size],
        isDisabled ? disabledClasses : variantClasses[variant],
        className,
      ].join(" ")}
    >
      {/* RIGHT side icon (rendered first = right in RTL / visually left in LTR) */}
      {renderRight}
      <span>{children}</span>
      {/* LEFT side icon */}
      {renderLeft}
    </HeroButton>
  );
}

export default Button;
