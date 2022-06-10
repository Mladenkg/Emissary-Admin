import React, { useEffect, useState } from "react";
import { SLIDER_IMAGE_PLACEHOLDER } from "../../../../config/common/slider-image";
import { getDotEnvConfiguration } from "../../../../config";
import { SliderData } from "../../../../types/models/SliderSettings";
import AppDialog from "@crema/core/AppDialog";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const GradientWrapper = styled("div")(() => ({
  position: "relative",
  '&::after': {
    background: "linear-gradient(278deg, transparent, rgba(91, 154, 146, 1) 72%)",
    content: '""',
    height: "100%",
    left: 0,
    opacity: 1,
    position: "absolute",
    top: 0,
    width: "100%"
  }
}));

interface SlidePreviewProps {
  onCloseSlidePreview: () => void;
  initialSliderData?: SliderData | null;
  isSlidePreviewOpen: boolean;
}

const SliderPreview: React.FC<SlidePreviewProps> = ({
  onCloseSlidePreview,
  initialSliderData,
  isSlidePreviewOpen,
}) => {

  const { baseUrl } = getDotEnvConfiguration();

  const [previewImage, setPreviewImage] = useState(
    initialSliderData && initialSliderData.image ?
      baseUrl.concat(initialSliderData.image) :
      SLIDER_IMAGE_PLACEHOLDER);

  useEffect(() => {
    setPreviewImage(
      initialSliderData && initialSliderData.image ?
        baseUrl.concat(initialSliderData.image) :
        SLIDER_IMAGE_PLACEHOLDER);
  }, [initialSliderData, baseUrl]);

  return (
    <>
      <AppDialog
        height="550px"
        maxWidth="xl"
        onClose={onCloseSlidePreview}
        open={isSlidePreviewOpen}
        width="1230px"
        sxStyle={{
          padding: "0px",
          margin: "0px"
        }} >
        <Box
          style={{
            display: "block",
            margin: "0px",
            padding: "0px"
          }} >
          <GradientWrapper>
            <CardMedia
              alt=""
              component="img"
              height="540"
              image={previewImage} />
          </GradientWrapper>
          <Box
            height={"100%"}
            width={"600px"}
            sx={{
              mt: -105,
              p: 0,
              pl: 20
            }} >
            <Box
              color="#FFFFFF"
              fontSize={"36px"}
              fontWeight={"300"}
              marginBottom={"26px"}
              position={"relative"}
              width={"480px"} >
              {initialSliderData ? initialSliderData.title : ""}
            </Box>
            <Box
              color="#FFFFFF"
              fontSize={"16px"}
              fontWeight={"300"}
              position={"relative"}
              width={"550px"} >
              {initialSliderData ? initialSliderData.description : ""}
            </Box>
            {initialSliderData && initialSliderData.button_1_name ?
              <Box
                display={"inline-block"}
                overflow={"hidden"}
                left={120}
                lineHeight={"42px"}
                position={"absolute"}
                textAlign={"center"}
                top={"80%"}
                sx={{
                  backgroundColor: "#E68726",
                  color: "#FFFFFF",
                  height: 44,
                  width: 230
                }} >
                {initialSliderData.button_1_name}
              </Box> : null}
            {initialSliderData && initialSliderData.button_2_name ?
              <Box
                border={"solid 1px #FFFFFF"}
                borderColor={"#FFFFFF"}
                display={"inline-block"}
                left={365}
                lineHeight={"42px"}
                overflow={"hidden"}
                position={"absolute"}
                textAlign={"center"}
                top={"80%"}
                sx={{
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  height: 44,
                  width: 230
                }} >
                {initialSliderData.button_2_name}
              </Box> : null}
          </Box>
        </Box>
      </AppDialog>
    </>
  );
};

export default SliderPreview;
