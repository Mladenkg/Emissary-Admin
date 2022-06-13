import React, { ReactNode } from "react";
import { BiAlignLeft } from "react-icons/bi";
import { RoutePermittedRole } from "../shared/constants/AppConst";

export interface RouterConfigData {
  id: string;
  title: string;
  messageId: string;
  icon?: string | ReactNode;
  type: "item" | "group" | "collapse" | "divider";
  children?: RouterConfigData[];
  permittedRole?: RoutePermittedRole;
  color?: string;
  url?: string;
  exact?: boolean;
  count?: number;
}

const routesConfig: RouterConfigData[] = [
  {
    id: "app",
    title: "Card",
    messageId: "sidebar.listTitle",
    type: "group",
    children: [
      {
        id: "slider-settings",
        title: "Slider Settings",
        messageId: "sidebar.card.sliderSettings",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/card/slider-settings",
      },
      {
        id: "popular-categories",
        title: "Popular Categories",
        messageId: "sidebar.card.popularCategories",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/card/popular-categories",
      },
      {
        id: "page-3",
        title: "Page 3",
        messageId: "sidebar.card.page3",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/card/page-3",
      },
      {
        id: "page-4",
        title: "Page 4",
        messageId: "sidebar.card.page4",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/card/page-4",
      },
      {
        id: "page-5",
        title: "Page 5",
        messageId: "sidebar.card.page5",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/card/page-5",
      },
      {
        id: "page-6",
        title: "Page 6",
        messageId: "sidebar.card.page6",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/card/page-6",
      },
      {
        id: "team-settings",
        title: "Team Settings",
        messageId: "sidebar.card.teamSettings",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/card/team-settings",
      },
      {
        id: "page-8",
        title: "Page 8",
        messageId: "sidebar.card.page8",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/card/page-8",
      },
      {
        id: "page-9",
        title: "Page 9",
        messageId: "sidebar.card.page9",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/card/page-9",
      },
      {
        id: "page-10",
        title: "Page 10",
        messageId: "sidebar.card.page10",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/card/page-10",
      },
      {
        id: "page-11",
        title: "Page 11",
        messageId: "sidebar.card.page11",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/card/page-11",
      },
      {
        id: "page-12",
        title: "Page 12",
        messageId: "sidebar.card.page12",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/card/page-12",
      },
      {
        id: "page-13",
        title: "Page 13",
        messageId: "sidebar.card.page13",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/card/page-13",
      },
      {
        id: "page-14",
        title: "Page 14",
        messageId: "sidebar.card.page14",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/card/page-14",
      },
      {
        id: "product-variations",
        title: "Product Variations",
        messageId: "sidebar.card.product-variations",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/card/product-variations",
      },
    ],
  },
];
export default routesConfig;
