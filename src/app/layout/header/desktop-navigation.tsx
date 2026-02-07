import { NavLink } from "./nav-link";
import { AuthButton } from "./auth-button";
import type { TNavbarItem } from "@/app/constants/types";
import { ROUTES } from "@/app/constants/routes";
import type { TFunction } from "i18next";

type TDesktopNavigationProps = {
  navItems: TNavbarItem[];
  t: TFunction<"common", undefined>;
};

export const DesktopNavigation = ({ navItems, t }: TDesktopNavigationProps) => {
  return (
    <>
      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-0.5">
        {navItems.map((navbarItem) => (
          <NavLink
          key={navbarItem.key}
            {...{
              
              isDisabled: navbarItem.isDisabled,
              isSoon: navbarItem.isSoon,
              link: navbarItem.link,
              t,
            }}
          >
            {t(`layout.header.navigation.${navbarItem.key}`)}
          </NavLink>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center gap-3">
        <AuthButton
          href={ROUTES.auth.signIn}
          variant="outline"
          display="desktop"
        >
          {t("layout.header.auth.signIn")}
        </AuthButton>
        <AuthButton
          href={ROUTES.auth.signUp}
          variant="primary"
          display="desktop"
        >
          {t("layout.header.auth.signUp")}
        </AuthButton>
      </div>
    </>
  );
};
