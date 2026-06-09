import { useEffect } from "react";
import { X } from "lucide-react";

type ToastType = "error" | "success" | "warning" | "info";

interface ToastProps {
  message: string;
  onClose: () => void;
  type?: ToastType;
}

const styles: Record<ToastType, { wrapper: string; dot: string }> = {
  error: {
    wrapper: "border-[#b07d4a] text-[#f0e9dc]",
    dot: "bg-[#b07d4a]",
  },
  success: {
    wrapper: "border-[#c9a87a] text-[#f0e9dc]",
    dot: "bg-[#c9a87a]",
  },
  warning: {
    wrapper: "border-[#c9a87a]/60 text-[#c9a87a]",
    dot: "bg-[#c9a87a]/60",
  },
  info: {
    wrapper: "border-[#2e2218] text-[#7a6248]",
    dot: "bg-[#5a4a38]",
  },
};

export function Toast({ message, onClose, type = "error" }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const s = styles[type];

  return (
    <div
      className={`
        fixed top-5 right-5 z-50
        flex items-center gap-3
        bg-[#0f0c08] border ${s.wrapper}
        text-sm px-5 py-3.5 rounded-sm
        shadow-[0_8px_32px_rgba(0,0,0,0.5)]
        animate-in slide-in-from-top-2 fade-in duration-300
      `}
    >
      <span
        className={`rounded-full shrink-0 ${s.dot} shadow-[0_0_6px] shadow-current`}
      />

      <span className="text-[12px] tracking-wide font-sans">{message}</span>

      <button
        onClick={onClose}
        className="ml-1 text-[#3a2c1c] hover:text-[#c9a87a] transition-colors"
      >
        <X size={13} />
      </button>
    </div>
  );
}
