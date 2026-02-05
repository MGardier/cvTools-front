interface NavDropdownProps {
  label: string;
}

export const NavDropdown = ({ label }: NavDropdownProps) => (
  <button className="flex items-center gap-1 text-[14px] text-zinc-500 hover:text-blue-400 transition-colors duration-200 px-3 py-2 group">
    {label}
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      className="text-zinc-400 group-hover:text-blue-400 transition-all duration-200 group-hover:translate-y-0.5"
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);
