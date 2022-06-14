import React from "react";

const SliderSettings = React.lazy(() => import("./slider-settings"));
const PopularCategories = React.lazy(() => import("./popular-categories"));
const Page3 = React.lazy(() => import("./Page3"));
const Page4 = React.lazy(() => import("./Page4"));
const Page5 = React.lazy(() => import("./Page5"));
const Page6 = React.lazy(() => import("./Page6"));
const TeamSettings = React.lazy(() => import("./team-settings"));
const MegaMenuSettings = React.lazy(() => import("./mega-menu-settings"));
const Page9 = React.lazy(() => import("./Page9"));
const Page10 = React.lazy(() => import("./Page10"));
const Page11 = React.lazy(() => import("./Page11"));
const Page12 = React.lazy(() => import("./Page12"));
const Page13 = React.lazy(() => import("./Page13"));
const Page14 = React.lazy(() => import("./Page14"));
const ProductVariations = React.lazy(() => import("./ProductVariations"));

export const cardPagesConfigs = [
  {
    path: "/card/slider-settings",
    element: <SliderSettings />,
  },
  {
    path: "/card/popular-categories",
    element: <PopularCategories />,
  },
  {
    path: "/card/page-3",
    element: <Page3 />,
  },
  {
    path: "/card/page-4",
    element: <Page4 />,
  },
  {
    path: "/card/page-5",
    element: <Page5 />,
  },
  {
    path: "/card/page-6",
    element: <Page6 />,
  },
  {
    path: "/card/team-settings",
    element: <TeamSettings />,
  },
  {
    path: "/card/mega-menu-settings",
    element: <MegaMenuSettings />,
  },
  {
    path: "/card/page-9",
    element: <Page9 />,
  },
  {
    path: "/card/page-10",
    element: <Page10 />,
  },
  {
    path: "/card/page-11",
    element: <Page11 />,
  },
  {
    path: "/card/page-12",
    element: <Page12 />,
  },
  {
    path: "/card/page-13",
    element: <Page13 />,
  },
  {
    path: "/card/page-14",
    element: <Page14 />,
  },
  {
    path: "/card/product-variations",
    element: <ProductVariations />,
  },
];
