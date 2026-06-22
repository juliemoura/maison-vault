import { Menu, ArrowUpRight, LogOut } from "lucide-react";
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
import { logout } from "@/store/authSlice";
import { useAppDispatch } from "@/store/store";
import { useNavigate } from "react-router";

const links = [
  { name: "Home", href: "/" },
  { name: "Marcas", href: "/features" },
  { name: "Sobre", href: "/about" },
];

export function MobileNavbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="flex h-18 items-center justify-between px-6 border-b border-[#2e2218] bg-[#0f0c08]">
      <div className="flex flex-col items-center">
        <h1 className="font-serif italic text-[#c9a87a] text-xl tracking-widest">
          Maison Vault
        </h1>
        <h2 className="font-sans text-[9px] tracking-[0.38em] text-[#5a4a38] uppercase mt-1">
          Luxury Bags · Est. 2026
        </h2>
      </div>

      <div className="flex gap-3 items-center">
        <ProfileMenu />

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Abrir menu"
              className="border border-[#2e2218] rounded-sm text-[#7a6248] hover:text-[#c9a87a] hover:border-[#c9a87a] hover:bg-[#1a1208] transition-colors"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-72 bg-[#0f0c08] border-l border-[#2e2218] text-[#f0e9dc] p-0"
          >
            <div className="h-0.5 bg-linear-to-r from-transparent via-[#c9a87a] to-transparent" />

            <SheetHeader className="px-6 pt-6 pb-5 border-b border-[#2e2218]">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-[10px] tracking-[0.3em] uppercase text-[#c9a87a] font-sans">
                  Navegação
                </SheetTitle>
                <span className="text-[9px] text-[#3a2c1c] tracking-[0.15em] uppercase">
                  Menu
                </span>
              </div>
            </SheetHeader>

            <nav className="flex flex-col px-3 py-4">
              {links.map((link, i) => (
                <SheetClose asChild key={link.name}>
                  <a
                    href={link.href}
                    className="
                      group relative flex items-center justify-between
                      px-3 py-4
                      text-[15px] font-serif text-[#b8a090]
                      hover:text-[#f0e9dc]
                      transition-colors duration-300
                      border-b border-[#1c1410] last:border-b-0
                    "
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[10px] font-sans text-[#3a2c1c] tracking-wider">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="relative">
                        {link.name}
                        <span
                          className="
                            absolute left-0 right-0 -bottom-1 h-px
                            bg-[#c9a87a] scale-x-0 origin-left
                            group-hover:scale-x-100 transition-transform duration-300
                          "
                        />
                      </span>
                    </span>

                    <ArrowUpRight className="h-4 w-4 text-[#3a2c1c] group-hover:text-[#c9a87a] transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </SheetClose>
              ))}
            </nav>

            <Button
              onClick={handleLogout}
              className="flex bg-transparent justify-start text-primary gap-2 w-full hover:text-amber-100"
            >
              <LogOut size={16} />
              <span>Sair</span>
            </Button>

            <div className="absolute bottom-0 left-0 right-0 px-6 py-5 border-t border-[#1c1410] flex items-center justify-between">
              <span className="text-[9px] text-[#3a2c1c] tracking-[0.15em] uppercase">
                © {new Date().getFullYear()} Maison Vault
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9a87a]" />
                <span className="text-[9px] text-[#5a4a38] tracking-[0.12em] uppercase">
                  Online
                </span>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
