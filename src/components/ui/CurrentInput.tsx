import { CurrencyInput as BaseCurrencyInput } from "react-currency-input-field";

interface CurrencyInputProps {
  label?: string;
  error?: string;
  value?: string;
  onChange: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function CurrencyInput({
  label,
  error,
  value,
  onChange,
  placeholder = "R$ 0,00",
  disabled,
}: CurrencyInputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-[10px] tracking-[0.25em] uppercase text-[#5a4a38]">
          {label}
        </label>
      )}

      <BaseCurrencyInput
        prefix="R$ "
        decimalSeparator=","
        groupSeparator="."
        decimalsLimit={2}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onValueChange={(value) => onChange(Number(value || 0))}
        className={`
          w-full px-4 py-3 rounded-sm

          bg-[#1a1208]
          border border-[#2e2218]

          text-[#f0e9dc]
          placeholder-[#3a2c1c]
          text-[13px]
          tracking-wide

          transition-all duration-200

          focus:outline-none
          focus:border-primary
          focus:bg-[#1c1408]

          hover:border-[#3a2c1c]

          disabled:opacity-40
          disabled:cursor-not-allowed
        `}
      />

      {error && <span className="text-[#b07d4a] text-[10px]">{error}</span>}
    </div>
  );
}
