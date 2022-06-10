import React from "react";
import { useIntl } from "react-intl";
import AppComponentHeader from "@crema/core/AppComponentHeader";
import AppGridContainer from "@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import SliderList from "./slider-list";

const SliderSettingsGrid = () => {
  const { messages } = useIntl();
  return (
    <>
      <AppComponentHeader
        description={messages["sliderSettings.sliderSettingsDescription"] as string}
        title={messages["sliderSettings.sliderSettingsTitle"] as string} />
      <AppGridContainer>
        <Grid item xs={12}>
          <SliderList></SliderList>
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default SliderSettingsGrid;
