import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

export function Button({
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-medium transition duration-200",
        "focus:outline-none focus:ring-2 focus:ring-brand-100",
        variant === "default" &&
          "bg-brand-500 text-white shadow-[0_10px_24px_rgba(49,94,251,0.26)] hover:-translate-y-0.5 hover:bg-brand-700",
        variant === "outline" &&
          "border border-slate-300/80 bg-white/90 text-slate-700 hover:border-slate-400 hover:bg-white",
        variant === "ghost" &&
          "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-ink",
        className
      )}
      {...props}
    />
  );
}
