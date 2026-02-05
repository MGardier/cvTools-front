import type { TFooterItem, TNavbarItem } from "./types";


export const NAVBAR_ITEMS : TNavbarItem[] = [
  {
    label: "Offres",
    key: "offers",
    isDisabled: false,
    isSoon : true,
  },
  {
    label: "Candidatures",
    key: "jobs",
    isDisabled: false,
    isSoon : true,
  },
  {
    label: "Aide",
    key: "help",
    isDisabled: false,
    isSoon : true,
  },
  {
    label: "Statistiques",
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
    label: "Offres",
    key: "offers",
    links : [
      { label: "About", link: "#" },
      { label: "Blog", link: "#" },
      { label: "Careers", link: "#" },
      { label: "Customers", link: "#" },
    ]
  },
  {
    label: "Candidatures",
    key: "jobs",
    links: [
      { label: "Contact", link: "#" },
      { label: "Support", link: "#" },
      { label: "Status", link: "#" },
      { label: "Migrate", link: "#" },
    ],
  },
{
    label: "Aides",
    key: "help",
    links: [
      { label: "Contact", link: "#" },
      { label: "Support", link: "#" },
      { label: "Status", link: "#" },
      { label: "Migrate", link: "#" },
    ],
  },
  
{
    label: "Mom compte",
    key: "account",
    links: [
      { label: "Contact", link: "#" },
      { label: "Support", link: "#" },
      { label: "Status", link: "#" },
      { label: "Migrate", link: "#" },
    ],
  },
  

 ] as const 