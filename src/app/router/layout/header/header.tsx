import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { TFunction } from "i18next";

import { ROUTES } from "@/app/constants/routes";
import { NAVBAR_ITEMS } from "@/app/constants/layout-items";
import { useMe } from "@/shared/hooks/useMe";
import { serializeOfferUrlState } from "@/modules/offer/utils/offer-search-params";
import { HeaderUi } from "./header.ui";

const SCROLL_THRESHOLD = 8;
const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";
const SHORTCUT_MODIFIER =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)
    ? "⌘"
    : "CTRL";

const isPathActive = (pathname: string, link?: string) =>
  !!link && (pathname === link || pathname.startsWith(`${link}/`));

type THeaderProps = {
  t: TFunction<"common", undefined>;
};

export const Header = ({ t }: THeaderProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, isPending } = useMe();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > SCROLL_THRESHOLD);
  const [searchValue, setSearchValue] = useState("");
  const [prevPathname, setPrevPathname] = useState(pathname);

  const desktopSearchRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  // Close the mobile menu on navigation (adjusted during render, no effect needed)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ctrl/Cmd + K focuses the search, Escape closes the mobile menu
  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      // Already handled (e.g. Tiptap link shortcut) or IME composition in progress
      if (event.defaultPrevented || event.isComposing) return;

      if ((event.metaKey || event.ctrlKey) && (event.key === "k" || event.key === "K")) {
        event.preventDefault();
        if (window.matchMedia(DESKTOP_MEDIA_QUERY).matches) {
          desktopSearchRef.current?.focus();
          desktopSearchRef.current?.select();
          return;
        }
        setIsMobileMenuOpen(true);
        requestAnimationFrame(() => mobileSearchRef.current?.focus());
        return;
      }

      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const submitSearch = useCallback(() => {
    const keyword = searchValue.trim();
    if (keyword === "") return false;

    const params = serializeOfferUrlState({ keyword }, 1);
    navigate(`${ROUTES.offer.list}?${params.toString()}`);
    setSearchValue("");
    setIsMobileMenuOpen(false);
    return true;
  }, [navigate, searchValue]);

  const handleSearchKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Escape") {
        event.currentTarget.blur();
        return;
      }
      if (event.key !== "Enter" || event.nativeEvent.isComposing) return;

      event.preventDefault();
      if (submitSearch()) event.currentTarget.blur();
    },
    [submitSearch],
  );

  const handleToggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((isOpen) => !isOpen);
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const navItems = NAVBAR_ITEMS.map((item) => ({
    ...item,
    isActive: isPathActive(pathname, item.link),
  }));

  return (
    <HeaderUi
      t={t}
      navItems={navItems}
      isAuthenticated={!!user}
      isAuthPending={isPending}
      isScrolled={isScrolled}
      isMobileMenuOpen={isMobileMenuOpen}
      onToggleMobileMenu={handleToggleMobileMenu}
      onCloseMobileMenu={handleCloseMobileMenu}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      onSearchKeyDown={handleSearchKeyDown}
      desktopSearchRef={desktopSearchRef}
      mobileSearchRef={mobileSearchRef}
      shortcutModifier={SHORTCUT_MODIFIER}
    />
  );
};
