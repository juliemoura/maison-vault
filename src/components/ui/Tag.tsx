interface BadgeProps {
  text: "Novo" | "Exclusivo" | "Promoção";
}

const badgeStyles = {
  Novo: {
    bg: "bg-green-500/15",
    border: "border-green-500/30",
    dot: "bg-green-500",
    text: "text-green-400",
  },
  Exclusivo: {
    bg: "bg-primary/15",
    border: "border-primary/30",
    dot: "bg-primary",
    text: "text-primary",
  },
  Promoção: {
    bg: "bg-orange-500/15",
    border: "border-orange-500/30",
    dot: "bg-orange-500",
    text: "text-orange-400",
  },
};

export function Tag({ text }: BadgeProps) {
  const style = badgeStyles[text];

  return (
    <div className="flex justify-end">
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md border ${style.bg} ${style.border}`}
      >
        <div className={`w-2 h-2 rounded-full ${style.dot}`} />
        <span
          className={`text-[10px] font-medium uppercase tracking-wider ${style.text}`}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
