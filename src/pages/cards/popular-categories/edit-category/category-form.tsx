import React from "react";
import { alpha, Box, Button } from "@mui/material";
import { Form } from "formik";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useDropzone } from "react-dropzone";
import { ACCEPTABLE_CATEGORY_IMAGE_FORMATS, MAX_CATEGORY_IMAGE_SIZE } from "../../../../config/common/category-image";
import { useIntl } from "react-intl";
import AppGridContainer from "@crema/core/AppGridContainer";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { styled } from "@mui/material/styles";

const HeaderWrapper = styled("div")(({ theme }) => {
  return {
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    flexDirection: "column",
    marginLeft: -24,
    marginRight: -24,
    marginTop: -20,
    padding: 20,
    "& .dropzone": {
      outline: 0,
      "&:hover .edit-icon, &:focus .edit-icon": {
        display: "flex"
      }
    }
  };
});

const AvatarViewWrapper = styled("div")(({ theme }) => {
  return {
    position: "relative",
    cursor: "pointer",
    "& .edit-icon": {
      alignItems: "center",
      backgroundColor: alpha(theme.palette.background.paper, 0.7),
      border: `solid 2px ${theme.palette.background.paper}`,
      borderRadius: "50%",
      bottom: 5,
      display: "none",
      height: 46,
      justifyContent: "center",
      position: "absolute",
      right: 5,
      transition: "all 0.4s ease",
      width: 46,
      zIndex: 1,
      "& .MuiSvgIcon-root": {
        fontSize: 30
      }
    }
  };
});

interface CategoryFormProps {
  values: any;
  imageUrl: string,
  startImageCrop: (image: File | undefined) => void;
  isSubmitting: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  values,
  imageUrl,
  startImageCrop,
  isSubmitting,
}) => {

  const { messages } = useIntl();

  const { getRootProps, getInputProps } = useDropzone({
    accept: ACCEPTABLE_CATEGORY_IMAGE_FORMATS,
    maxSize: MAX_CATEGORY_IMAGE_SIZE, // TODO handle after cropping -istevanovic
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length) {
        startImageCrop(acceptedFiles[0]);
      }
      else {
        //warrning for image problems
      }
    }
  });

  return (
    <>
      <Form
        style={{
          height: "80%",
          width: "100%"
        }}
        noValidate
        autoComplete="off" >
        <AppGridContainer sx={{ pt: 0, pl: 0 }} spacing={5}>
          <Grid item xs={12} md={6}>
            <HeaderWrapper sx={{ border: 0 }}>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <label htmlFor="icon-button-file">
                  <AvatarViewWrapper>
                    <CardMedia
                      sx={{
                        width: 170,
                        height: 170,
                      }}
                      component="img"
                      image={imageUrl}
                      alt=""
                    />
                    <Box className="edit-icon">
                      <AddAPhotoIcon />
                    </Box>
                  </AvatarViewWrapper>
                </label>
              </div>
            </HeaderWrapper>
            <Box
              sx={{ pl: 16, pb: 3, mt: -5, color: "grey.400" }}>
              {messages["popularCategories.form.acceptableImagesMsg"] as string}
            </Box>
          </Grid>
        </AppGridContainer>
        <Box sx={{ pb: 5, pt: 0 }}>
          <AppTextField
            name="title"
            sx={{
              width: "100%",
              fontWeight: Fonts.LIGHT,
            }}
            variant="outlined"
            label={messages["popularCategories.form.categoryTitle"] as string}
          />
        </Box>
        <Box sx={{ pb: 5, pt: 0 }}>
          <AppTextField
            name="action"
            sx={{
              width: "100%",
              backgroundColor: "background.paper",
              color: "text.primary",
            }}
            variant="outlined"
            label={messages["popularCategories.form.categoryAction"] as string} />
        </Box>
        <div style={{ textAlign: "right" }}>
          <Button
            sx={{
              position: "relative",
              minWidth: 100,
            }}
            color="primary"
            variant="outlined"
            disabled={isSubmitting}
            type="submit" >
            {messages["common.save"] as string}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CategoryForm;
