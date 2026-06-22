import { useEffect, useState } from "react";

interface LoadingProps {
  label?: string;
  fullScreen?: boolean;
}

export function Loading({
  label = "Carregando",
  fullScreen = false,
}: LoadingProps) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d + 1) % 4);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const content = (
    <div className="flex flex-col items-center justify-center gap-7">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg
          className="absolute inset-0 animate-[spin_3s_linear_infinite]"
          viewBox="0 0 80 80"
          fill="none"
        >
          <circle
            cx="40"
            cy="40"
            r="37"
            stroke="#2e2218"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
        </svg>

        <svg
          className="absolute inset-0 animate-[spin_1.4s_linear_infinite_reverse]"
          viewBox="0 0 80 80"
          fill="none"
        >
          <circle
            cx="40"
            cy="40"
            r="30"
            stroke="#c9a87a"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="40 150"
          />
        </svg>

        <div className="w-9 h-9 border border-[#c9a87a]/50 rotate-45 flex items-center justify-center">
          <span className="-rotate-45 font-serif italic text-[#c9a87a] text-sm select-none">
            MV
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <p className="text-[9px] text-[#7a6248] tracking-[0.3em] uppercase">
          {label}
          <span className="inline-block w-3.5 text-left">
            {".".repeat(dots)}
          </span>
        </p>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-0.75 h-0.75 rounded-full bg-[#c9a87a]"
              style={{
                opacity: dots === i + 1 ? 1 : 0.25,
                transition: "opacity 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0c08]">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-16">{content}</div>
  );
}
