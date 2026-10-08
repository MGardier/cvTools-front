import type { KeyboardEvent, RefObject } from "react";
import type { TFunction } from "i18next";

import { cn } from "@/shared/utils/utils";
import { HeaderSearchUi } from "./header-search.ui";
import { NavLinkUi } from "./nav-link.ui";
import { AuthLinkUi, CreateApplicationLinkUi } from "./header-actions.ui";
import type { THeaderNavItem } from "./types";

type TMobileMenuUiProps = {
  id: string;
  t: TFunction<"common", undefined>;
  isOpen: boolean;
  navItems: THeaderNavItem[];
  isAuthenticated: boolean;
  isAuthPending: boolean;
  onClose: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  searchRef: RefObject<HTMLInputElement | null>;
};

export const MobileMenuUi = ({
  id,
  t,
  isOpen,
  navItems,
  isAuthenticated,
  isAuthPending,
  onClose,
  searchValue,
  onSearchChange,
  onSearchKeyDown,
  searchRef,
}: TMobileMenuUiProps) => {
  return (
    <div
      id={id}
      className={cn(
        "absolute inset-x-0 top-full mt-2 rounded-xl border border-zinc-200/80 bg-white p-3 shadow-[0_20px_40px_-20px_rgb(24_24_27/0.3)] transition-[opacity,transform,visibility] duration-200 motion-reduce:transition-none lg:hidden",
        isOpen
          ? "pointer-events-auto visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-1 opacity-0",
      )}
    >
      <HeaderSearchUi
        id="header-search-mobile"
        label={t("layout.header.search.label")}
        placeholder={t("layout.header.search.placeholder")}
        value={searchValue}
        onChange={onSearchChange}
        onKeyDown={onSearchKeyDown}
        inputRef={searchRef}
        variant="mobile"
      />

      <nav aria-label={t("layout.header.ariaLabel")} className="mt-3">
        <ul className="grid gap-1">
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
                variant="mobile"
                onNavigate={onClose}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-3 grid gap-2 border-t border-zinc-100 pt-3">
        <CreateApplicationLinkUi
          label={t("layout.header.cta.createApplication")}
          variant="block"
          onNavigate={onClose}
        />
        <AuthLinkUi
          isAuthenticated={isAuthenticated}
          isPending={isAuthPending}
          signInLabel={t("layout.header.auth.signIn")}
          logoutLabel={t("layout.header.auth.logout")}
          variant="block"
          onNavigate={onClose}
        />
      </div>
    </div>
  );
};
