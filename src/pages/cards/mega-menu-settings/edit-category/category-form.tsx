import React from "react";
import { alpha, Box, Button } from "@mui/material";
import { Form } from "formik";
import CardMedia from "@mui/material/CardMedia";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useDropzone } from "react-dropzone";
import { ACCEPTABLE_CATEGORY_IMAGE_FORMATS, MAX_CATEGORY_IMAGE_SIZE } from "../../../../config/common/category-image";
import { useIntl } from "react-intl";
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
    minSize: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length === 1)
        startImageCrop(acceptedFiles[0]);
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
        <Box sx={{ pt: 0, pl: 0 }}>
          <HeaderWrapper sx={{ border: 0 }}>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <label htmlFor="icon-button-file">
                <AvatarViewWrapper>
                  <CardMedia
                    sx={{
                      width: 560,
                      height: 130
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
            sx={{
              color: (theme) => theme.palette.grey[500],
              mt: -4,
              pb: 3,
              pl: 0
            }}>
            {messages["megaMenuSettings.form.acceptableImagesMsg"] as string}
          </Box>
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
