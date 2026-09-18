import type { ReactNode } from "react";

export type footerLinkDataType = {
  title: string;
  link: string;
};

export type footerLinkType = {
  [key: string]: {
    title: string;
    link: string;
    data: footerLinkDataType[];
  };
};

export type footerSocialMediaType = {
    icon: ReactNode,
    link: string,
}