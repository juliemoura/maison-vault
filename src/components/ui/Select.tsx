import * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react";

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        `
        flex w-fit items-center justify-between gap-2
        rounded-sm border border-border
        bg-[#1a1208]
        px-4 py-3
        text-[13px] tracking-wide text-foreground
        whitespace-nowrap
        transition-all
        outline-none select-none

        hover:border-[#3a2c1c]

        focus-visible:border-primary
        focus-visible:ring-2
        focus-visible:ring-primary/30

        disabled:cursor-not-allowed
        disabled:opacity-40
        `,
        className,
      )}
      {...props}
    >
      {children}

      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 text-muted" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        align={align}
        className={cn(
          `
          z-50
          min-w-40
          overflow-hidden
          rounded-sm
          border border-border
          bg-surface
          text-foreground
          shadow-lg

          data-[state=open]:animate-in
          data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0
          data-[state=open]:fade-in-0
          `,
          className,
        )}
      >
        <SelectScrollUpButton />

        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>

        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        `
        relative flex w-full cursor-pointer
        items-center gap-2
        rounded-sm
        px-3 py-2
        text-[13px]
        text-foreground
        outline-none
        select-none

        transition-colors

        hover:bg-[#241a10]
        focus:bg-[#241a10]

        data-disabled:opacity-50
        data-disabled:pointer-events-none
        `,
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4 text-primary" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn(
        "px-2 py-1 text-[10px] tracking-[0.25em] uppercase text-muted",
        className,
      )}
      {...props}
    />
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn("my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        "flex items-center justify-center py-1 text-muted bg-surface",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        "flex items-center justify-center py-1 text-muted bg-surface",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
