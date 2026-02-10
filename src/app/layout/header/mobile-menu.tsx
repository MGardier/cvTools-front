import { MobileNavItem } from "./mobile-nav-item";
import { AuthButton } from "./auth-button";
import type { TNavbarItem } from "@/app/constants/types";
import { ROUTES } from "@/app/constants/routes";
import { useMe } from "@/shared/hooks/useMe";
import type { TFunction } from "i18next";

type TMobileMenuProps = {
  isOpen: boolean;
  navItems: TNavbarItem[];
  t: TFunction<"common", undefined>;
};

export const MobileMenu = ({ isOpen, navItems, t }: TMobileMenuProps) => {
  const { user } = useMe();

  return (
    <div
      className={`md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-zinc-200 transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="px-4 py-6 space-y-1">
        {navItems.map((navbarItem) => (
          <MobileNavItem
            key={navbarItem.key}
            {...{
              isDisabled: navbarItem.isDisabled,
              isSoon: navbarItem.isSoon,
              link: navbarItem.link,
              t,
            }}
          >
            {t(`layout.header.navigation.${navbarItem.key}`)}
          </MobileNavItem>
        ))}
        <div className="pt-4 mt-4 border-t border-zinc-200 space-y-3">
          {user ? (
            <AuthButton
              href={ROUTES.auth.logout}
              variant="primary"
              display="mobile"
            >
              {t("layout.header.auth.logout")}
            </AuthButton>
          ) : (
            <>
              <AuthButton
                href={ROUTES.auth.signIn}
                variant="outline"
                display="mobile"
              >
                {t("layout.header.auth.signIn")}
              </AuthButton>
              <AuthButton
                href={ROUTES.auth.signUp}
                variant="primary"
                display="mobile"
              >
                {t("layout.header.auth.signUp")}
              </AuthButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
