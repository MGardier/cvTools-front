import { ROUTES } from "./routes";
import type { TFooterItem, TNavbarItem } from "./types";


export const NAVBAR_ITEMS : TNavbarItem[] = [
  {
    label: "offers",
    key: "offers",
    link: ROUTES.offer.list,
    isDisabled: false,
    isSoon : false,
  },
  {
    label: "applications",
    key: "applications",
    link: ROUTES.application.list,
    isDisabled: false,
    isSoon : false,
  },
  {
    label: "help",
    key: "help",
    isDisabled: false,
    isSoon : true,
  },
  {
    label: "statistics",
    key: "statistics",
    isDisabled: true,
    isSoon : false,
  },


] as const;


export const FOOTER_ITEMS : TFooterItem[] = [

  {
    label: "offers",
    key: "offers",
    links : [
      { label: "about", link: "#" },
      { label: "blog", link: "#" },
      { label: "careers", link: "#" },
      { label: "customers", link: "#" },
    ]
  },
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