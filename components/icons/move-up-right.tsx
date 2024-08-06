import { cn } from "@/lib/utils";
import React from "react";

function MoveUpRight({
  className,
  ...props
}: {
  className?: string;
  [x: string]: any;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={cn("lucide lucide-move-up-right", className)}
    >
      <path d="M13 5H19V11" />
      <path d="M19 5L5 19" />
    </svg>
  );
}

export default MoveUpRight;
