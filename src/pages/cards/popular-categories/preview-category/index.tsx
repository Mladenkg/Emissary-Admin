import React, { useEffect, useState } from "react";
import { CATEGORY_IMAGE_PLACEHOLDER } from "../../../../config/common/category-image";
import { getDotEnvConfiguration } from "../../../../config";
import { PopularCategoryData } from "../../../../types/models/PopularCategories";
import AppDialog from "@crema/core/AppDialog";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const GradientWrapper = styled("div")(() => ({
  position: "relative",
  '&::after': {
    background: "linear-gradient(180deg, transparent, rgba(221, 221, 221, 1) 90%)",
    content: '""',
    height: "100%",
    left: 0,
    opacity: 1,
    position: "absolute",
    top: 0,
    width: "100%"
  }
}));

interface CategoryPreviewProps {
  onCloseCategoryPreview: () => void;
  initialPopularCategoryData?: PopularCategoryData | null;
  isCategoryPreviewOpen: boolean;
}

const SliderPreview: React.FC<CategoryPreviewProps> = ({
  onCloseCategoryPreview,
  initialPopularCategoryData,
  isCategoryPreviewOpen,
}) => {

  const { baseUrl } = getDotEnvConfiguration();

  const [previewImage, setPreviewImage] = useState(
    initialPopularCategoryData && initialPopularCategoryData.image ?
      baseUrl.concat(initialPopularCategoryData.image) :
      CATEGORY_IMAGE_PLACEHOLDER);

  useEffect(() => {
    setPreviewImage(
      initialPopularCategoryData && initialPopularCategoryData.image ?
        baseUrl.concat(initialPopularCategoryData.image) :
        CATEGORY_IMAGE_PLACEHOLDER);
  }, [initialPopularCategoryData, baseUrl]);

  return (
    <>
      <AppDialog
        height="415px"
        onClose={onCloseCategoryPreview}
        open={isCategoryPreviewOpen}
        width="415px" >
        <Box
          sx={{
            p: 0,
            pl: 0,
            height: 0
          }} >
          <GradientWrapper>
            <CardMedia
              alt=""
              component="img"
              image={previewImage}
            />
          </GradientWrapper>
          <Box
            sx={{
              mt: -34,
              p: 0,
              pl: 4,
              height: 0
            }}
            color="#444"
            fontSize={"24px"}
            fontWeight={"400"}
            position={"relative"}
            textTransform={"uppercase"}
            width={"280px"} >
            {initialPopularCategoryData ? initialPopularCategoryData.title : ""}
          </Box>
          <Box
            fontWeight={"400"}
            overflow={"hidden"}
            left={40}
            lineHeight={"37px"}
            position={"absolute"}
            textAlign={"center"}
            textTransform={"uppercase"}
            top={"86%"}
            sx={{
              backgroundColor: "#444",
              color: "#fff",
              height: 37,
              width: 150
            }} >
            EXPLORE
          </Box>
        </Box>
      </AppDialog>
    </>
  );
};

export default SliderPreview;
