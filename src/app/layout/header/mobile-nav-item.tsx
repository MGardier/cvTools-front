import type { TFunction } from "i18next";

type  TMobileNavItemProps =  {
  link?: string;
  children: React.ReactNode;
  isDisabled: boolean;
  isSoon: boolean;
  t: TFunction<"common", undefined>;
}

export const MobileNavItem = ({
  link,
  children,
  isDisabled = false,
  isSoon = false,
  t
}: TMobileNavItemProps) => {

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled || isSoon) {
      e.preventDefault();
    }
  };

  return (
    <a
      href={isDisabled || isSoon ? undefined : link}
      onClick={handleClick}
      className={`
        flex items-center justify-between w-full py-3 transition-colors
        ${
          isDisabled || isSoon
            ? "text-zinc-400 cursor-not-allowed opacity-60"
            : "text-zinc-500 hover:text-blue-400"
        }
      `}
    >
      <span className="flex items-center gap-2">
        {children}

        {/* Soon badge*/}
        {isSoon && !isDisabled && (
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700 whitespace-nowrap">
            {t("layout.header.badges.soon")}
          </span>
        )}

        {/* Disabled badge */}
        {isDisabled && (
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-lg bg-gray-900 text-white whitespace-nowrap">
            {t("layout.header.badges.unavailable")}
          </span>
        )}
      </span>
    </a>
  );
};
