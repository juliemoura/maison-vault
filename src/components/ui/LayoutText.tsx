import { useIsMobile } from "@/hooks/use-mobile";
import { CreditCard, ShieldCheck, Truck } from "lucide-react";
import { Outlet } from "react-router";

export default function LayoutText() {
  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? (
        <div className="border-b-2 p-4 flex gap-4 justify-between px-8 bg-primary/4">
          <div className="flex gap-2 items-center">
            <Truck size={16} className="text-[#5a4a38]" />
            <span className="font-sans text-[10px] tracking-[0.38em] text-primary uppercase mt-1">
              Frete grátis acima de R$ 2.000
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <CreditCard size={16} className="text-[#5a4a38]" />
            <span className="font-sans text-[10px] tracking-[0.38em] text-primary uppercase mt-1">
              Parcele em 12x sem juros
            </span>
          </div>
        </div>
      ) : (
        <div className="border-b-2 p-4 flex gap-4 justify-between px-8 bg-primary/4">
          <div className="flex gap-2 items-center">
            <Truck size={16} className="text-[#5a4a38]" />
            <span className="font-sans text-[10px] tracking-[0.38em] text-primary uppercase mt-1">
              Frete grátis acima de R$ 2.000
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <ShieldCheck size={16} className="text-[#5a4a38]" />
            <span className="font-sans text-[10px] tracking-[0.38em] text-primary uppercase mt-1">
              Autenticidade certificada
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <CreditCard size={16} className="text-[#5a4a38]" />
            <span className="font-sans text-[10px] tracking-[0.38em] text-primary uppercase mt-1">
              Parcele em 12x sem juros
            </span>
          </div>
        </div>
      )}

      <main>
        <Outlet />
      </main>
    </div>
  );
}
