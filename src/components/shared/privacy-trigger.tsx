"use client";

import { openPrivacy } from "@/components/shared/privacy-dialog";
import { cn } from "@/lib/utils";

// Opens the shared Privacy & Data Protection dialog from anywhere.
export function PrivacyTrigger({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={openPrivacy}
      className={cn("transition-colors duration-300", className)}
    >
      {children}
    </button>
  );
}
