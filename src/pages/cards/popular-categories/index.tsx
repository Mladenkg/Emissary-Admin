import React from "react";
import { Box } from "@mui/material";
import PopularCategoriesGrid from "./grid";

const PopularCategories = () => {
  return (
    <>
      <Box sx={{ my: 2 }}>
        <PopularCategoriesGrid></PopularCategoriesGrid>
      </Box>
    </>
  );
};

export default PopularCategories;
