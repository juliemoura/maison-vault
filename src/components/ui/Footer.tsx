import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Input } from "./Input";
import { useState } from "react";
import { Toast } from "./Toast";

const columns = [
  {
    title: "Coleções",
    links: [
      { name: "Bolsas", href: "/colecoes/bolsas" },
      { name: "Novidades", href: "/novidades" },
      //   { name: "Mais vendidas", href: "/colecoes/mais-vendidas" },
      { name: "Promoções", href: "/promocoes" },
    ],
  },
  {
    title: "Marcas",
    links: [
      { name: "Chanel", href: "/marcas/chanel" },
      { name: "Hermès", href: "/marcas/hermes" },
      { name: "Louis Vuitton", href: "/marcas/louis-vuitton" },
      { name: "Ver todas", href: "/marcas" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { name: "Sobre a Maison Vault", href: "/sobre" },
      { name: "Autenticidade", href: "/autenticidade" },
      { name: "Venda sua bolsa", href: "/vender" },
      //   { name: "Trabalhe conosco", href: "/carreiras" },
    ],
  },
  {
    title: "Atendimento",
    links: [
      { name: "Central de ajuda", href: "/help" },
      //   { name: "Trocas e devoluções", href: "/trocas" },
      { name: "Política de privacidade", href: "/privacy" },
      { name: "Termos de uso", href: "/terms" },
    ],
  },
];

export function Footer() {
  const [toast, setToast] = useState<string | null>(null);

  return (
    <>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <footer className="bg-[#0a0804] border-t border-[#1c1410]">
        <div className="border-b border-[#1c1410] px-8 py-12">
          <div className="max-w-300 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[9px] tracking-[0.35em] text-[#c9a87a] uppercase mb-2">
                Fique por dentro
              </p>
              <h3 className="font-serif text-[22px] text-[#f0e9dc]">
                Receba acesso antecipado às novas peças.
              </h3>
            </div>

            <form
              className="flex w-full md:w-auto gap-0"
              onSubmit={(e) => {
                e.preventDefault();
                setToast("Inscrição realizada com sucesso!");
              }}
            >
              <Input
                type="email"
                placeholder="seuemail@exemplo.com"
                className="bg-[#1a1208] border border-[#2e2218] border-r-0 rounded-l-sm px-4 py-3 text-[13px] text-[#f0e9dc] placeholder-[#3a2c1c] outline-none focus:border-[#c9a87a] transition-colors w-full md:w-72"
              />
              <button
                type="submit"
                className="flex hover:cursor-pointer items-center gap-2 bg-[#c9a87a] text-[#0f0c08] text-[10px] font-bold tracking-[0.2em] uppercase px-5 rounded-r-sm hover:bg-[#e0c090] transition-colors whitespace-nowrap"
              >
                Inscrever
                <ArrowUpRight size={14} />
              </button>
            </form>
          </div>
        </div>

        <div className="px-8 py-14">
          <div className="max-w-300 mx-auto grid grid-cols-2 md:grid-cols-5 gap-10">
            <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
              <div>
                <h2 className="font-serif italic text-[#c9a87a] text-xl tracking-widest">
                  Maison Vault
                </h2>
                <p className="font-sans text-[8px] tracking-[0.35em] text-[#5a4a38] uppercase mt-1">
                  Luxury Bags · Est. 2024
                </p>
              </div>
              <p className="text-[12px] text-[#5a4a38] leading-relaxed">
                Curadoria de bolsas de luxo autenticadas, com discrição e
                excelência em cada detalhe.
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href="mailto:contato@maisonvault.com"
                  className="flex items-center gap-2 text-[11px] text-[#7a6248] hover:text-[#c9a87a] transition-colors"
                >
                  <Mail size={13} />
                  contato@maisonvault.com
                </a>
                <a
                  href="tel:+551140028922"
                  className="flex items-center gap-2 text-[11px] text-[#7a6248] hover:text-[#c9a87a] transition-colors"
                >
                  <Phone size={13} />
                  +55 (11) 4002-8922
                </a>
                <span className="flex items-center gap-2 text-[11px] text-[#7a6248]">
                  <MapPin size={13} />
                  São Paulo, Brasil
                </span>
              </div>
            </div>

            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h4 className="text-[9px] tracking-[0.25em] text-[#c9a87a] uppercase">
                  {col.title}
                </h4>
                <nav className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-[12px] text-[#5a4a38] hover:text-[#f0e9dc] transition-colors w-fit"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#1c1410] px-8 py-6">
          <div className="max-w-300 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[9px] text-[#3a2c1c] tracking-widest text-center md:text-left">
              © {new Date().getFullYear()} Maison Vault. Todos os direitos
              reservados.
            </p>

            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a87a]" />
              <span className="text-[9px] text-[#5a4a38] tracking-[0.15em] uppercase">
                Autenticidade certificada
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
