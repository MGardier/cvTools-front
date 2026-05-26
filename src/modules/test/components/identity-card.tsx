import type { ReactNode } from "react";

import { CANDIDATE } from "../data/candidate";

import { ContactDialog } from "./contact-dialog";
import { ContactList } from "./contact-list";

type TIdentityCardProps = {
  children?: ReactNode;
};

export const IdentityCard = ({ children }: TIdentityCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm md:p-6">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative flex flex-col gap-5 md:flex-row md:gap-6">
        <div className="flex min-w-0 flex-1 flex-col items-center gap-3 text-center md:flex-row md:items-center md:gap-5 md:text-left">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-400 shadow-lg shadow-blue-300/60 ring-4 ring-white md:h-20 md:w-20">
            <span className="text-2xl font-medium tracking-tight text-white md:text-3xl">
              {CANDIDATE.firstName[0]}
              {CANDIDATE.lastName[0]}
            </span>
          </div>
          <div className="min-w-0">
            <h2 className="text-2xl font-medium leading-tight tracking-tight text-zinc-900 md:text-3xl">
              {CANDIDATE.firstName} {CANDIDATE.lastName}
            </h2>
            <p className="mt-1 text-sm font-medium text-blue-400 md:text-[15px]">
              {CANDIDATE.title}
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
              {CANDIDATE.tagline}
            </p>
          </div>
        </div>

        {/* Desktop / md: contact list in the sidebar */}
        <ContactList className="hidden shrink-0 md:flex md:border-l md:border-zinc-100 md:pl-6" />

        {/* Mobile: button opening the contact dialog */}
        <ContactDialog className="md:hidden" />
      </div>

      {children}
    </div>
  );
};
