import { cn } from "../lib/utils";
import React from "react";

interface GradientBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GradientBorderCard({
  children,
  className,
  ...props
}: GradientBorderCardProps) {
  return (
    <div
      className={cn(
        "relative p-[2px] rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-cyan-400",
        className
      )}
      {...props}
    >
      <div className="rounded-[14px] w-full h-full bg-slate-900/80 backdrop-blur-xl p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}
