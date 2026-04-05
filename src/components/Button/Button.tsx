import { Button as HeroButton } from "@heroui/react";

// ─── Design reference ─────────────────────────────────────────────────────────
// Figma: Components → Buttons
// Variants: solid (Default), bordered (Secondary), ghost
// States: default, disabled
// Height per size: sm=40px, md=56px (Figma spec), lg=64px
// Font: IBM Plex Sans Arabic SemiBold 16px / 24px
// ─────────────────────────────────────────────────────────────────────────────

export type ButtonVariant = "solid" | "bordered" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm gap-1.5",
  md: "h-14 px-4 text-base gap-2",   // 56px — matches Figma
  lg: "h-16 px-6 text-lg gap-2.5",
};

// Maps our variant to the visual styling via Tailwind.
// HeroUI's Button is used for accessibility & ripple; we fully override colours.
const variantClasses: Record<ButtonVariant, string> = {
  solid:
    "bg-[#007aff] text-white border-transparent " +
    "hover:bg-[#006fe8] active:bg-[#0057b5] " +
    "data-[disabled=true]:bg-[#e5e5e5] data-[disabled=true]:text-[#b3b3b3]",
  bordered:
    "bg-transparent border border-[#007aff] text-[#007aff] " +
    "hover:bg-[#e6f2ff] active:bg-[#b0d6ff] " +
    "data-[disabled=true]:border-[#b3b3b3] data-[disabled=true]:text-[#b3b3b3]",
  ghost:
    "bg-transparent border-transparent text-[#007aff] " +
    "hover:bg-[#e6f2ff] active:bg-[#b0d6ff] " +
    "data-[disabled=true]:text-[#b3b3b3]",
};

export function Button({
  children,
  variant = "solid",
  size = "md",
  isDisabled = false,
  leadingIcon,
  trailingIcon,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <HeroButton
      type={type}
      isDisabled={isDisabled}
      onPress={onClick}
      // Disable HeroUI's own colour tokens so our classes win
      style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
      className={[
        // Base
        "w-full flex items-center justify-center rounded-lg",
        `font-semibold leading-6`,
        // Size
        sizeClasses[size],
        // Variant
        variantClasses[variant],
        // Disabled cursor
        isDisabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      ].join(" ")}
    >
      {trailingIcon && (
        <span className="shrink-0 size-6 flex items-center justify-center">
          {trailingIcon}
        </span>
      )}
      <span>{children}</span>
      {leadingIcon && (
        <span className="shrink-0 size-6 flex items-center justify-center">
          {leadingIcon}
        </span>
      )}
    </HeroButton>
  );
}

export default Button;
