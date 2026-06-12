import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-sm border border-transparent bg-clip-padding text-[10px] font-sans font-bold tracking-[0.22em] uppercase whitespace-nowrap transition-all outline-none select-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-40 aria-invalid:border-[#b07d4a] aria-invalid:ring-2 aria-invalid:ring-[#b07d4a]/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#b07d4a] bg-[length:200%_100%] text-[#0f0c08] hover:brightness-110 active:brightness-95",
        outline:
          "border-[#2e2218] bg-transparent text-[#7a6248] hover:border-primary hover:text-primary hover:bg-[#1a1208] aria-expanded:border-primary aria-expanded:text-primary",
        secondary:
          "bg-[#1a1208] border-[#2e2218] text-[#7a6248] hover:bg-[#221808] hover:text-primary hover:border-[#3a2c1c] aria-expanded:bg-[#221808] aria-expanded:text-primary",
        ghost:
          "bg-transparent text-[#5a4a38] hover:bg-[#1a1208] hover:text-primary aria-expanded:bg-[#1a1208] aria-expanded:text-primary",
        destructive:
          "bg-[#b07d4a]/10 text-[#b07d4a] border-[#b07d4a]/20 hover:bg-[#b07d4a]/20 focus-visible:border-[#b07d4a]/40 focus-visible:ring-[#b07d4a]/20",
        link: "text-primary underline-offset-4 hover:underline hover:text-[#e0c090]",
      },
      size: {
        default:
          "h-8 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-sm px-2 text-[9px] tracking-[0.2em] in-data-[slot=button-group]:rounded-sm has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-sm px-2.5 text-[9px] tracking-[0.2em] in-data-[slot=button-group]:rounded-sm has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2 px-8 text-[11px] tracking-[0.28em] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-sm in-data-[slot=button-group]:rounded-sm [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-sm in-data-[slot=button-group]:rounded-sm",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;