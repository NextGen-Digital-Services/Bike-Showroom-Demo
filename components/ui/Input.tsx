import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const generatedId = id || React.useId();

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={generatedId} className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            id={generatedId}
            type={type}
            ref={ref}
            className={cn(
              "w-full rounded-xl border bg-white dark:bg-slate-900/80 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 dark:focus:ring-rose-500/20",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                : "border-slate-300 dark:border-slate-800",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-slate-400 dark:text-slate-500 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-rose-500 font-medium">{error}</span>}
        {helperText && !error && <span className="text-xs text-slate-500 dark:text-slate-400">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
