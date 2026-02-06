
/******************** NAVBAR ****************************/

export type TNavbarItem = {
  label: string;
  key: string
  link?: string
  isDisabled: boolean;
  isSoon: boolean;
}


/******************** FOOTER ****************************/

export type TFooterItem = {
  label: string;
  key: string;
  links: TFooterSubItem[]
}

export type TFooterSubItem = {
  link?: string;
  label: string;

}


/******************** EXTERNAL LINKS ****************************/

export type TExternaLinks = {
  github: string;
  linkedin: string;
}

