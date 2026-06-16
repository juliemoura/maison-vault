"use client";

import { Menu } from "lucide-react";
import { Button } from "./Button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./Sheet";
import { ProfileMenu } from "./ProfileMenu";

const links = [
  { name: "Home", href: "/" },
  { name: "Marcas", href: "/features" },
  { name: "Sobre", href: "/about" },
];

export function MobileNavbar() {
  return (
    <header className="flex h-18 items-center justify-between px-6 border-b">
      <div className="flex flex-col text-center">
        <h1 className="font-serif italic text-primary text-xl tracking-widest">
          Maison Vault
        </h1>
        <h2 className="font-sans text-[9px] tracking-[0.38em] text-[#5a4a38] uppercase mt-1">
          Luxury Bags · Est. 2026
        </h2>
      </div>

      <div className="flex gap-4 items-center">
        <ProfileMenu />

        <Sheet>
          {/* Trigger */}
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Abrir menu"
              className="hover:bg-white/5 transition"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          {/* Content */}
          <SheetContent
            side="right"
            className="w-70 bg-[#0f0c08] border-l border-[#2a1f16] text-[#f0e9dc]"
          >
            {/* Header fixo */}
            <SheetHeader className="border-b border-[#2a1f16] pb-4 mb-6">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-sm tracking-[0.25em] uppercase text-[#c9a87a]">
                  Navegação
                </SheetTitle>
              </div>
            </SheetHeader>

            {/* Nav */}
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <SheetClose asChild key={link.name}>
                  <a
                    href={link.href}
                    className="
                  group relative px-3 py-2 text-sm tracking-wide
                  text-[#b8a090] hover:text-[#f0e9dc]
                  transition-colors
                "
                  >
                    <span className="relative z-10">{link.name}</span>

                    {/* hover luxury underline */}
                    <span
                      className="
                    absolute left-3 right-3 bottom-1 h-0.5
                    bg-[#c9a87a]/40 scale-x-0 origin-left
                    group-hover:scale-x-100 transition-transform duration-300
                  "
                    />
                  </a>
                </SheetClose>
              ))}
            </nav>

            {/* footer opcional */}
            <div className="absolute bottom-6 left-6 right-6 text-xs text-[#7a6248]">
              © {new Date().getFullYear()} Luxury Bags
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
