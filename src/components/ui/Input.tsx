import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: React.ReactNode;
  type?: string;
}

export function Input({
  label,
  error,
  icon,
  className,
  disabled,
  type = "text",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="block text-[9px] font-sans font-normal tracking-[0.25em] uppercase text-[#5a4a38]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#3a2c1c]">
            {icon}
          </div>
        )}
        <input
          disabled={disabled}
          type={type}
          className={`
            w-full px-4 py-3 rounded-sm
            bg-[#1a1208] border border-[#2e2218]
            text-[#f0e9dc] placeholder-[#3a2c1c] text-[13px] tracking-wide
            transition-all duration-200
            focus:outline-none focus:border-primary focus:bg-[#1c1408]
            hover:border-[#3a2c1c]
            disabled:opacity-40 disabled:cursor-not-allowed
            ${icon ? "pl-11" : ""}
            ${error ? "border-[#b07d4a] focus:border-[#b07d4a]" : ""}
            ${className || ""}
          `}
          {...props}
        />
      </div>
      {error && <span className="text-[#b07d4a] text-[10px]">{error}</span>}
    </div>
  );
}
