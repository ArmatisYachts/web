import Image from "next/image";
import { cn } from "@/lib/utils";

const SRC = {
  dark: "/assets/brand/armatis-wordmark-dark.png",
  light: "/assets/brand/armatis-wordmark-light.png",
} as const;

// Intrinsic size of the trimmed wordmark asset.
const NATURAL_WIDTH = 941;
const NATURAL_HEIGHT = 118;
const RATIO = NATURAL_WIDTH / NATURAL_HEIGHT;

function Mark({
  variant,
  width,
  height,
  priority,
  className,
}: {
  variant: "dark" | "light";
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={SRC[variant]}
      alt="ARMATIS"
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      className={cn("select-none", className)}
      style={{ height, width }}
    />
  );
}

// `variant="auto"` follows the theme: dark mark on light surfaces, light mark in
// dark mode. Pass "dark"/"light" to force a fixed tone.
export function ArmatisWordmark({
  variant = "auto",
  height = 20,
  priority = false,
  className,
}: {
  variant?: "dark" | "light" | "auto";
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  const width = Math.round(height * RATIO);

  if (variant !== "auto") {
    return (
      <Mark
        variant={variant}
        width={width}
        height={height}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <>
      <span className="block dark:hidden">
        <Mark variant="dark" width={width} height={height} priority={priority} className={className} />
      </span>
      <span className="hidden dark:block">
        <Mark variant="light" width={width} height={height} priority={priority} className={className} />
      </span>
    </>
  );
}
