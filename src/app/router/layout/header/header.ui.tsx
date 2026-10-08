import type { KeyboardEvent, RefObject } from "react";
import type { TFunction } from "i18next";
import { Menu, X } from "lucide-react";

import { AppLogo } from "@/shared/components/logo/app-logo";
import { cn } from "@/shared/utils/utils";
import { HeaderSearchUi } from "./header-search.ui";
import { NavLinkUi } from "./nav-link.ui";
import { AuthLinkUi, CreateApplicationLinkUi } from "./header-actions.ui";
import { MobileMenuUi } from "./mobile-menu.ui";
import type { THeaderNavItem } from "./types";

const MOBILE_MENU_ID = "header-mobile-menu";

type THeaderUiProps = {
  t: TFunction<"common", undefined>;
  navItems: THeaderNavItem[];
  isAuthenticated: boolean;
  isAuthPending: boolean;
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  desktopSearchRef: RefObject<HTMLInputElement | null>;
  mobileSearchRef: RefObject<HTMLInputElement | null>;
  shortcutModifier: string;
};

export const HeaderUi = ({
  t,
  navItems,
  isAuthenticated,
  isAuthPending,
  isScrolled,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
  searchValue,
  onSearchChange,
  onSearchKeyDown,
  desktopSearchRef,
  mobileSearchRef,
  shortcutModifier,
}: THeaderUiProps) => {
  return (
    // pointer-events-none: the transparent gutters around the floating bar must not block the page
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      {/* Click-catcher behind the mobile menu */}
      {isMobileMenuOpen && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={onCloseMobileMenu}
          className="pointer-events-auto fixed inset-0 -z-10 cursor-default bg-zinc-950/10 lg:hidden"
        />
      )}

      <div className="relative mx-auto max-w-[1600px]">
        <div
          className={cn(
            "pointer-events-auto flex h-16 items-center gap-6 rounded-xl border border-zinc-200/80 pl-5 pr-3 backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-300 sm:pl-7 lg:pr-5",
            isMobileMenuOpen ? "bg-white lg:bg-white/75" : "bg-white/75",
            isScrolled
              ? "shadow-[0_12px_32px_-14px_rgb(24_24_27/0.22)]"
              : "shadow-[0_1px_2px_rgb(24_24_27/0.04)]",
          )}
        >
          <AppLogo className="shrink-0" />

          {/* Desktop */}
          <div className="ml-auto hidden items-center gap-5 lg:flex xl:gap-7">
            <HeaderSearchUi
              id="header-search"
              label={t("layout.header.search.label")}
              placeholder={t("layout.header.search.placeholder")}
              value={searchValue}
              onChange={onSearchChange}
              onKeyDown={onSearchKeyDown}
              inputRef={desktopSearchRef}
              shortcutModifier={shortcutModifier}
              className="w-52 xl:w-64"
            />

            <nav aria-label={t("layout.header.ariaLabel")}>
              <ul className="flex items-center gap-5 xl:gap-7">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <NavLinkUi
                      label={t(`layout.header.navigation.${item.key}`)}
                      link={item.link}
                      isActive={item.isActive}
                      isSoon={item.isSoon}
                      isDisabled={item.isDisabled}
                      soonLabel={t("layout.header.badges.soon")}
                      unavailableLabel={t("layout.header.badges.unavailable")}
                    />
                  </li>
                ))}
              </ul>
            </nav>

            <CreateApplicationLinkUi label={t("layout.header.cta.createApplication")} />

            <span aria-hidden="true" className="h-5 w-px bg-zinc-200" />

            <AuthLinkUi
              isAuthenticated={isAuthenticated}
              isPending={isAuthPending}
              signInLabel={t("layout.header.auth.signIn")}
              logoutLabel={t("layout.header.auth.logout")}
            />
          </div>

          {/* Mobile */}
          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <CreateApplicationLinkUi
              label={t("layout.header.cta.createApplication")}
              variant="icon"
            />
            <button
              type="button"
              onClick={onToggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls={MOBILE_MENU_ID}
              aria-label={t(
                isMobileMenuOpen ? "layout.header.menu.close" : "layout.header.menu.open",
              )}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
            >
              {isMobileMenuOpen ? (
                <X className="size-[18px]" aria-hidden="true" />
              ) : (
                <Menu className="size-[18px]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <MobileMenuUi
          id={MOBILE_MENU_ID}
          t={t}
          isOpen={isMobileMenuOpen}
          navItems={navItems}
          isAuthenticated={isAuthenticated}
          isAuthPending={isAuthPending}
          onClose={onCloseMobileMenu}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          onSearchKeyDown={onSearchKeyDown}
          searchRef={mobileSearchRef}
        />
      </div>
    </header>
  );
};
