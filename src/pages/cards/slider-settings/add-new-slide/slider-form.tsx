import React from "react";
import { alpha, Box, Button } from "@mui/material";
import { Form } from "formik";
import Grid from "@mui/material/Grid";
import CardMedia from '@mui/material/CardMedia';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useDropzone } from "react-dropzone";
import { ACCEPTABLE_IMAGE_FORMATS, MAX_IMAGE_SIZE } from "../../../../config/common/slider-image";
import Divider from "@mui/material/Divider";
import { useIntl } from "react-intl";
import AppGridContainer from "@crema/core/AppGridContainer";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { styled } from "@mui/material/styles";

const StyledDivider = styled(Divider)(({ theme }) => ({
  marginTop: 4,
  marginBottom: 16,
  [theme.breakpoints.up("xl")]: {
    marginTop: 32,
    marginBottom: 32,
  },
}));
const HeaderWrapper = styled("div")(({ theme }) => {
  return {
    padding: 20,
    marginLeft: -24,
    marginRight: -24,
    marginTop: -20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.divider}`,
    "& .dropzone": {
      outline: 0,
      "&:hover .edit-icon, &:focus .edit-icon": {
        display: "flex",
      },
    },
  };
});
const AvatarViewWrapper = styled("div")(({ theme }) => {
  return {
    position: "relative",
    cursor: "pointer",
    "& .edit-icon": {
      position: "absolute",
      bottom: 5,
      right: 5,
      zIndex: 1,
      border: `solid 2px ${theme.palette.background.paper}`,
      backgroundColor: alpha(theme.palette.background.paper, 0.7),
      borderRadius: "50%",
      width: 46,
      height: 46,
      display: "none",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.4s ease",
      "& .MuiSvgIcon-root": {
        fontSize: 30,
      },
    },
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
    maxSize: MAX_IMAGE_SIZE, // handle after cropping -istevanovic
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length) {
        startImageCrop(acceptedFiles[0]);
      }
      else {
        //warrning for image problems
      }
    },

  });

  return (
    <>
      <Form
        style={{
          width: "100%",
        }}
        noValidate
        autoComplete="off"
      >
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
                        height: 122,
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
            label={messages["sliderSettings.form.description"] as string}
          />
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
              label={messages["sliderSettings.form.button1Name"] as string}
            />
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
              label={messages["sliderSettings.form.button1Action"] as string}
            />
          </Grid>
        </AppGridContainer>
        <AppGridContainer spacing={5} sx={{ pb: 5 }}>
          <Grid item xs={12} md={6}>
            <AppTextField
              name="button_2_name"
              sx={{
                width: "100%",
                backgroundColor: "background.paper",
                color: "text.primary",
              }}
              variant="outlined"
              label={messages["sliderSettings.form.button2Name"] as string}
            />
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
              label={messages["sliderSettings.form.button2Action"] as string}
            />
          </Grid>
        </AppGridContainer>
        <StyledDivider />
        <div style={{ textAlign: "right" }}>
          <Button
            sx={{
              position: "relative",
              minWidth: 100,
            }}
            color="primary"
            variant="outlined"
            disabled={isSubmitting}
            type="submit"
          >
            {messages["common.save"] as string}
          </Button>
        </div>
      </Form>
    </>

  );
};

export default SliderForm;
