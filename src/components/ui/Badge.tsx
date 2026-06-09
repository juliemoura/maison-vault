interface BadgeProps {
  text: string;
}

export function Badge({ text }: BadgeProps) {
  return (
    <div className="flex justify-end">
      <div className="flex items-center gap-2 bg-[rgba(22,14,6,0.9)] border border-[#2e2218] rounded-full px-4 py-2">
        <div className="w-1.75 h-1.75 rounded-full bg-[#c9a87a] shadow-[0_0_8px_#c9a87a99]" />
        <span className="text-[9px] text-[#7a6248] tracking-[0.18em] uppercase">
          {text}
        </span>
      </div>
    </div>
  );
}
