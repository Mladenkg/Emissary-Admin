import React from "react";
import { authRouteConfig } from "./auth";
import { initialUrl } from "shared/constants/AppConst";
import Error403 from "./errorPages/Error403";
import { errorPagesConfigs } from "./errorPages";
import { cardPagesConfigs } from "./cards";
import { profilePage } from "./profile";

const authorizedStructure = {
  fallbackPath: "/signin",
  unAuthorizedComponent: <Error403 />,
  routes: [...cardPagesConfigs, ...profilePage],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: authRouteConfig,
};

const anonymousStructure = {
  routes: errorPagesConfigs,
};

export { authorizedStructure, unAuthorizedStructure, anonymousStructure };
