import React from "react";
import { useIntl } from "react-intl";
import AppComponentHeader from "@crema/core/AppComponentHeader";
import AppGridContainer from "@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import MegaMenuList from "./mega-menu-list";

const MegaMenuGrid = () => {
  const { messages } = useIntl();
  return (
    <>
      <AppComponentHeader
        description={messages["megaMenuSettings.megaMenuSettingsDescription"] as string}
        title={messages["megaMenuSettings.megaMenuSettingsTitle"] as string} />
      <AppGridContainer>
        <Grid item xs={12}>
          <MegaMenuList></MegaMenuList>
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default MegaMenuGrid;
