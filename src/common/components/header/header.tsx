import { useEffect, useState } from "react";
import { AppLogo } from "../logo/app-logo";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileMenu } from "./mobile-menu";
import { NAVBAR_ITEMS } from "@/common/constants/layout-items";
import { Menu, X } from "lucide-react";
import type { TFunction } from "i18next";

type THeaderProps = {
  t: TFunction<"common", undefined>;
};

export const Header = ({ t }: THeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl border-b border-zinc-200 shadow-sm" : ""}`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 max-w-[1200px] mx-auto">
          {/* Logo */}
          <AppLogo />

          {/* Desktop Navigation */}
          <DesktopNavigation {...{ navItems: NAVBAR_ITEMS, t }} />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-zinc-500 hover:text-gray-900 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <MobileMenu {...{ isOpen: mobileMenuOpen, navItems: NAVBAR_ITEMS, t }} />
    </header>
  );
};
