import React from "react";
import { useIntl } from "react-intl";
import AppComponentHeader from "@crema/core/AppComponentHeader";
import AppGridContainer from "@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import TeamList from "./team-list";

const TeamGrid = () => {
  const { messages } = useIntl();
  return (
    <>
      <AppComponentHeader
        description={messages["teamSettings.teamSettingsDescription"] as string}
        title={messages["teamSettings.teamSettingsTitle"] as string} />
      <AppGridContainer>
        <Grid item xs={12}>
          <TeamList></TeamList>
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default TeamGrid;
