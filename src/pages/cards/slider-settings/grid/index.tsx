import React from "react";
import AppComponentHeader from "@crema/core/AppComponentHeader";
import AppGridContainer from "@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import SliderList from "./slider-list";

const Overview = () => {
  return (
    <>
      <AppComponentHeader
        title="Slider Settings"
        description="Use this page to manage slides. You need at least 1 and maximum 5 slides."
      />

      <AppGridContainer>
        <Grid item xs={12}>
          <SliderList></SliderList>
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Overview;
