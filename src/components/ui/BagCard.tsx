import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Heart, ShoppingCart } from "lucide-react";

interface BagCardProps {
  label: "Novo" | "Exclusivo" | "Promoção";
  image: string;
  brand: string;
  title: string;
  value: string;
}

export function BagCard({ label, image, brand, title, value }: BagCardProps) {
  return (
    <div className="w-max cursor-pointer">
      <div className="flex flex-col p-4 border hover:shadow-lg hover:border-primary transition-shadow duration-300">
        <Label text={label} />
        <img
          src={image}
          alt={title}
          className="w-full h-60 object-cover mb-5"
        />
      </div>

      <div className="border-t-2 bg-primary/10 p-4">
        <h2 className="font-sans text-[11px] tracking-[0.38em] text-primary uppercase mt-1">
          {brand}
        </h2>
        <h3 className="font-arial text-md font-bold text-white mt-1">
          {title}
        </h3>
        <div className="flex items-center justify-between gap-20">
          <span className="font-arial text-sm tracking-[0.12em] text-primary mt-1 w-max">
            R$ {value}
          </span>
          <div className="flex items-center gap-2">
            <Button className="bg-primary/20 border border-primary font-sans text-[10px] text-primary uppercase mt-1">
              <Heart />
            </Button>
            <Button className="bg-transparent border border-primary font-sans text-[10px] text-primary uppercase mt-1">
              <ShoppingCart />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
