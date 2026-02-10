import type { TFunction } from "i18next";
import { Lock } from "lucide-react";
import { useState } from "react";

type TNavLinkProps = {
  link?: string;
  children: React.ReactNode;
  isDisabled?: boolean ;
  isSoon?: boolean;
  t: TFunction<"common", undefined>;
}

export const NavLink = ({
  link,
  children,
  isDisabled = false,
  isSoon = false,
  t
}: TNavLinkProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled || isSoon) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <a
        href={isDisabled || isSoon ? undefined : link}
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          group relative inline-flex items-center gap-2 px-3 py-2 text-[14px] rounded-lg
          transition-all duration-200
          ${
            isDisabled || isSoon
              ? "text-zinc-400 cursor-not-allowed opacity-60"
              : "text-zinc-500 hover:bg-blue-400 hover:text-white"
          }
        `}
      >
        <span>{children}</span>

        {/* Soon badge  */}
        {isSoon && !isDisabled && (
          <span className="inline-flex items-center text-xs font-semibold rounded-full bg-gray-200 text-gray-700 whitespace-nowrap max-w-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:max-w-[100px] group-hover:px-2.5 group-hover:py-1 group-hover:ml-2 transition-all duration-200">
            {t("layout.header.badges.soon")}
          </span>
        )}

        {/* Disabled icon */}
        {isDisabled && !isSoon && showTooltip && (
          <Lock size={12} />
        )}
      </a>

      {/* Tooltip  */}
      {isDisabled  && showTooltip && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-[12px] rounded-lg whitespace-nowrap z-50 shadow-lg">
          {t("layout.header.badges.unavailable")}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      )}
    </div>
  );
};
