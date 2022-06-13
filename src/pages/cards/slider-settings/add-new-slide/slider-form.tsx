import React from "react";
import { alpha, Box, Button } from "@mui/material";
import { Form } from "formik";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useDropzone } from "react-dropzone";
import { ACCEPTABLE_IMAGE_FORMATS, MAX_IMAGE_SIZE } from "../../../../config/common/slider-image";
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

interface SliderFormProps {
  values: any;
  imageUrl: string,
  startImageCrop: (image: File | undefined) => void;
  isSubmitting: boolean;
}

const SliderForm: React.FC<SliderFormProps> = ({
  values,
  imageUrl,
  startImageCrop,
  isSubmitting,
}) => {

  const { messages } = useIntl();

  const { getRootProps, getInputProps } = useDropzone({
    accept: ACCEPTABLE_IMAGE_FORMATS,
    maxSize: MAX_IMAGE_SIZE, // TODO handle after cropping -istevanovic
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
        <AppGridContainer sx={{ pt: 1 }} spacing={5}>
          <Grid item xs={12} md={6}>
            <HeaderWrapper sx={{ border: 0 }}>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <label htmlFor="icon-button-file">
                  <AvatarViewWrapper>
                    <CardMedia
                      sx={{
                        width: 294,
                        height: 122
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
                mt: -5,
                pb: 3,
                pl: 5
              }}>
              {messages["sliderSettings.form.acceptableImagesMsg"] as string}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <AppTextField
              name="title"
              sx={{
                width: "100%",
                fontWeight: Fonts.LIGHT,
              }}
              variant="outlined"
              label={messages["sliderSettings.form.sliderTitle"] as string}
            />
          </Grid>
        </AppGridContainer>
        <Box sx={{ pb: 5, pt: 0 }}>
          <AppTextField
            name="description"
            multiline
            sx={{
              width: "100%",
              backgroundColor: "background.paper",
              color: "text.primary",
            }}
            rows="5"
            variant="outlined"
            label={messages["sliderSettings.form.description"] as string} />
        </Box>
        <AppGridContainer spacing={5} sx={{ pb: 5 }}>
          <Grid item xs={12} md={6}>
            <AppTextField
              name="button_1_name"
              sx={{
                width: "100%",
                backgroundColor: "background.paper",
                color: "text.primary",
              }}
              variant="outlined"
              label={messages["sliderSettings.form.button1Name"] as string} />
          </Grid>
          <Grid item xs={12} md={6}>
            <AppTextField
              name="button_1_action"
              sx={{
                width: "100%",
                backgroundColor: "background.paper",
                color: "text.primary",
              }}
              variant="outlined"
              label={messages["sliderSettings.form.button1Action"] as string} />
          </Grid>
        </AppGridContainer>
        <AppGridContainer spacing={5} sx={{ pb: 6 }}>
          <Grid item xs={12} md={6}>
            <AppTextField
              name="button_2_name"
              sx={{
                width: "100%",
                backgroundColor: "background.paper",
                color: "text.primary",
              }}
              variant="outlined"
              label={messages["sliderSettings.form.button2Name"] as string} />
          </Grid>
          <Grid item xs={12} md={6}>
            <AppTextField
              name="button_2_action"
              sx={{
                width: "100%",
                backgroundColor: "background.paper",
                color: "text.primary",
              }}
              variant="outlined"
              label={messages["sliderSettings.form.button2Action"] as string} />
          </Grid>
        </AppGridContainer>
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

export default SliderForm;
