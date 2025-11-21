import React from "react";
import { cn } from "../../lib/utils";

export const Button = ({
  children,
  variant = "primary",
  className,
  ...props
}) => {
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800",
    secondary:
      "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50",
    ghost: "hover:bg-slate-100 text-slate-600",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    orange: "bg-orange-500 text-white hover:bg-orange-600",
  };

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
