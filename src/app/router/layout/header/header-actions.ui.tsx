import { Link } from "react-router-dom";
import { LogIn, LogOut, Plus } from "lucide-react";

import { ROUTES } from "@/app/constants/routes";
import { cn } from "@/shared/utils/utils";

const LABEL_CLASSNAME = "text-[12px] font-semibold uppercase tracking-[0.04em]";

/******************** CREATE APPLICATION (CTA) ****************************/

type TCreateApplicationLinkUiProps = {
  label: string;
  /** icon: square icon-only button, block: full width (mobile menu) */
  variant?: "default" | "icon" | "block";
  onNavigate?: () => void;
};

export const CreateApplicationLinkUi = ({
  label,
  variant = "default",
  onNavigate,
}: TCreateApplicationLinkUiProps) => {
  const isIconOnly = variant === "icon";

  return (
    <Link
      to={ROUTES.application.create}
      onClick={onNavigate}
      aria-label={isIconOnly ? label : undefined}
      title={isIconOnly ? label : undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-500 text-white shadow-md shadow-blue-500/25 transition-[background-color,box-shadow,transform] hover:bg-blue-600 hover:shadow-blue-500/40 active:translate-y-px focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30",
        isIconOnly ? "size-9" : LABEL_CLASSNAME,
        variant === "default" && "h-9 px-4",
        variant === "block" && "h-11 w-full px-4",
      )}
    >
      <Plus aria-hidden="true" strokeWidth={2.5} className="size-4" />
      {!isIconOnly && <span>{label}</span>}
    </Link>
  );
};

/******************** SIGN IN / LOGOUT ****************************/

type TAuthLinkUiProps = {
  isAuthenticated: boolean;
  isPending: boolean;
  signInLabel: string;
  logoutLabel: string;
  variant?: "default" | "block";
  onNavigate?: () => void;
};

export const AuthLinkUi = ({
  isAuthenticated,
  isPending,
  signInLabel,
  logoutLabel,
  variant = "default",
  onNavigate,
}: TAuthLinkUiProps) => {
  const sizeClassName = variant === "block" ? "h-11 w-full px-4" : "h-9 px-4";

  // Placeholder while the session is resolved, to avoid a sign-in/logout flash
  if (isPending) {
    return (
      <span
        aria-hidden="true"
        className={cn("block animate-pulse rounded-lg bg-zinc-100", sizeClassName, variant === "default" && "w-32")}
      />
    );
  }

  const Icon = isAuthenticated ? LogOut : LogIn;

  return (
    <Link
      to={isAuthenticated ? ROUTES.auth.logout : ROUTES.auth.signIn}
      onClick={onNavigate}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white text-zinc-900 transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20",
        LABEL_CLASSNAME,
        sizeClassName,
      )}
    >
      <Icon aria-hidden="true" className="size-4 text-zinc-500" />
      <span>{isAuthenticated ? logoutLabel : signInLabel}</span>
    </Link>
  );
};
