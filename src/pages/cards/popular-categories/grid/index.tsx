import React from "react";
import { useIntl } from "react-intl";
import AppComponentHeader from "@crema/core/AppComponentHeader";
import AppGridContainer from "@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import PopularCategoriesList from "./popular-categories-list";

const PopularCategoriesGrid = () => {
  const { messages } = useIntl();
  return (
    <>
      <AppComponentHeader
        description={messages["popularCategories.popularCategoriesDescription"] as string}
        title={messages["popularCategories.popularCategoriesTitle"] as string} />
      <AppGridContainer>
        <Grid item xs={12}>
          <PopularCategoriesList></PopularCategoriesList>
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default PopularCategoriesGrid;
