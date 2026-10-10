import { ROUTES } from "./routes";
import type { TFooterItem, TNavbarItem } from "./types";


export const NAVBAR_ITEMS : TNavbarItem[] = [
  {
    label: "CV",
    key: "test",
    link: ROUTES.test.root,
    isDisabled: false,
    isSoon : true,
  },


] as const;


export const FOOTER_ITEMS : TFooterItem[] = [

  {
    label: "applications",
    key: "applications",
    links: [
      { label: "contact", link: "#" },
      { label: "support", link: "#" },
      { label: "status", link: "#" },
      { label: "migrate", link: "#" },
    ],
  },
  {
    label: "help",
    key: "help",
    links: [
      { label: "contact", link: "#" },
      { label: "support", link: "#" },
      { label: "status", link: "#" },
      { label: "migrate", link: "#" },
    ],
  },
  {
    label: "account",
    key: "account",
    links: [
      { label: "contact", link: "#" },
      { label: "support", link: "#" },
      { label: "status", link: "#" },
      { label: "migrate", link: "#" },
    ],
  },

 ] as const 