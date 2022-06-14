import React, { useEffect, useState } from "react";
import { MEGA_MENU_CATEGORY_IMAGE_PLACEHOLDER } from "../../../../config/common/category-image";
import { getDotEnvConfiguration } from "../../../../config";
import { MegaMenuData } from "../../../../types/models/MegaMenuCategories";
import AppDialog from "@crema/core/AppDialog";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";


interface CategoryPreviewProps {
  onCloseCategoryPreview: () => void;
  initialMegaMenuData?: MegaMenuData | null;
  isCategoryPreviewOpen: boolean;
}

const MegaMenuCategoryPreview: React.FC<CategoryPreviewProps> = ({
  onCloseCategoryPreview,
  initialMegaMenuData,
  isCategoryPreviewOpen,
}) => {

  const { baseUrl } = getDotEnvConfiguration();

  const [previewImage, setPreviewImage] = useState(
    initialMegaMenuData && initialMegaMenuData.image && initialMegaMenuData.image.src !== "" ?
      baseUrl.concat(initialMegaMenuData.image.src) :
      MEGA_MENU_CATEGORY_IMAGE_PLACEHOLDER);

  useEffect(() => {
    setPreviewImage(
      initialMegaMenuData && initialMegaMenuData.image && initialMegaMenuData.image.src !== "" ?
        baseUrl.concat(initialMegaMenuData.image.src) :
        MEGA_MENU_CATEGORY_IMAGE_PLACEHOLDER);
  }, [initialMegaMenuData, baseUrl]);

  return (
    <>
      <AppDialog
        height="195px"
        onClose={onCloseCategoryPreview}
        open={isCategoryPreviewOpen}
        width="580px" >
        <Box
          sx={{
            p: 0,
            height: 0
          }} >
          <CardMedia
            alt=""
            component="img"
            image={previewImage} />
        </Box>
      </AppDialog>
    </>
  );
};

export default MegaMenuCategoryPreview;
