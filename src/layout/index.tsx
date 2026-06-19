import { DesktopNavbar } from "@/components/ui/DesktopNavbar";
import LayoutText from "@/components/ui/LayoutText";
import { MobileNavbar } from "@/components/ui/MobileNavbar";
import { useIsMobile } from "@/hooks/use-mobile";
export default function Layout() {
  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
      <LayoutText />
    </div>
  );
}
