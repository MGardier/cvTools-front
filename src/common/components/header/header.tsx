import { useEffect, useState } from "react";
import { NavLink } from "./nav-link";
import { MobileNavItem } from "./mobile-nav-item";
import { AppLogo } from "../logo/app-logo";
import { NAVBAR_ITEMS } from "@/common/constants/layout-items";
import { Menu, X } from "lucide-react";

export const Header = () => {
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
          <div className="hidden md:flex items-center gap-0.5">
            {NAVBAR_ITEMS.map((navbarItem) => (
              <NavLink
                key={navbarItem.key}
                isDisabled={navbarItem.isDisabled}
                isSoon={navbarItem.isSoon}
                link={navbarItem.link}
              >
                {navbarItem.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="text-[14px] text-blue-400 bg-white px-4 py-2 rounded-lg font-medium hover:text-blue-500 border-blue-400 border-1 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Se connecter
            </a>
            <a
              href="/signup"
              className="text-[14px] bg-blue-400 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              S'inscrire
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-zinc-500 hover:text-gray-900 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <Menu size={24} /> : <X size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-zinc-200 transition-all duration-300 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div className="px-4 py-6 space-y-1">
          {NAVBAR_ITEMS.map((navbarItem) => (
            <MobileNavItem
              key={navbarItem.key}
              isDisabled={navbarItem.isDisabled}
              isSoon={navbarItem.isSoon}
              link={navbarItem.link}
            >
              {navbarItem.label}
            </MobileNavItem>
          ))}
          <div className="pt-4 mt-4 border-t border-zinc-200 space-y-3">
            <a
              href="/login"
              className="block text-center text-[14px] text-blue-400 bg-white px-4 py-2.5 rounded-lg font-medium border border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              Se connecter
            </a>
            <a
              href="/signup"
              className="block text-center bg-blue-400 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              S'inscrire
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
