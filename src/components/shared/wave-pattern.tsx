import { cn } from "@/lib/utils";

// ARMATIS signature wave — real brand pattern extracted to transparent, tintable
// textures. `variant="auto"` follows the theme (dark lines in light mode, light
// lines in dark mode); pass "dark"/"light" to force a fixed tone (e.g. footer).
const SRC = {
  dark: "/assets/brand/wave-texture-dark.png",
  light: "/assets/brand/wave-texture-light.png",
} as const;

function Tile({ variant, size }: { variant: "dark" | "light"; size: number }) {
  return (
    <span
      className="absolute inset-0 block bg-repeat"
      style={{
        backgroundImage: `url(${SRC[variant]})`,
        backgroundSize: `${size}px auto`,
      }}
    />
  );
}

export function WavePattern({
  variant = "auto",
  size = 480,
  className,
}: {
  variant?: "dark" | "light" | "auto";
  size?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {variant === "auto" ? (
        <>
          <span className="absolute inset-0 block dark:hidden">
            <Tile variant="dark" size={size} />
          </span>
          <span className="absolute inset-0 hidden dark:block">
            <Tile variant="light" size={size} />
          </span>
        </>
      ) : (
        <Tile variant={variant} size={size} />
      )}
    </div>
  );
}
