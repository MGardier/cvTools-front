import type { TFooterItem, TNavbarItem } from "./types";


export const NAVBAR_ITEMS : TNavbarItem[] = [
  {
    label: "offers",
    key: "offers",
    isDisabled: false,
    isSoon : true,
  },
  {
    label: "jobs",
    key: "jobs",
    isDisabled: false,
    isSoon : true,
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
  {
    label: "test",
    key: "test",
    link:"/",
    isDisabled: false,
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
    label: "jobs",
    key: "jobs",
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