import type { KeyboardEvent, RefObject } from "react";
import { Search } from "lucide-react";

import { cn } from "@/shared/utils/utils";

const KBD_CLASSNAME =
  "inline-flex h-5 min-w-5 items-center justify-center rounded-[5px] bg-zinc-200/70 px-1 font-sans text-[10px] font-semibold text-zinc-500";

type THeaderSearchUiProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  /** Shows the keyboard shortcut hint (from xl) when provided */
  shortcutModifier?: string;
  variant?: "desktop" | "mobile";
  className?: string;
};

export const HeaderSearchUi = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  onKeyDown,
  inputRef,
  shortcutModifier,
  variant = "desktop",
  className,
}: THeaderSearchUiProps) => {
  return (
    <div role="search" className={cn("relative", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
      />

      <input
        ref={inputRef}
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        enterKeyHint="search"
        className={cn(
          "w-full appearance-none rounded-full border border-zinc-200 bg-zinc-50 pl-10 text-zinc-900 outline-none transition-[border-color,background-color,box-shadow] placeholder:text-zinc-500 hover:border-zinc-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/15 [&::-webkit-search-cancel-button]:hidden",
          variant === "mobile" ? "h-11 text-sm" : "h-9 text-[13px]",
          shortcutModifier ? "pr-4 xl:pr-[4.5rem]" : "pr-4",
        )}
      />

      {shortcutModifier && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 xl:flex"
        >
          <kbd className={KBD_CLASSNAME}>{shortcutModifier}</kbd>
          <kbd className={KBD_CLASSNAME}>K</kbd>
        </span>
      )}
    </div>
  );
};
