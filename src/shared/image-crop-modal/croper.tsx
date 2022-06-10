import React, { useCallback, useState } from "react";
import IntlMessages from "@crema/utility/IntlMessages";
import AppDialog from "@crema/core/AppDialog";
import { DialogActions, Box, Button } from "@mui/material";

import ReactCrop, { centerCrop, makeAspectCrop, Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export interface ImageCropModalProps {
  show: boolean;
  imageUrl: string | null;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowParent: React.Dispatch<React.SetStateAction<boolean>>;
  setImageField: (image: Blob | string | undefined) => void;
  cropAspect?: number;
  cropInitialWidth?: number; // percent 1-100
}

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
  imageUrl,
  show,
  setShow,
  setShowParent,
  setImageField,
  cropAspect = 1,
  cropInitialWidth = 70,
}) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>();

  const handleCloseModal = useCallback(() => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    setShow(false);
    setShowParent(true);
  }, [setShow, setShowParent, imageUrl]);

  const imageOnLoadHandler = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setImage(e.currentTarget);

      const { width, height } = e.currentTarget;
      const aspectCropObj = makeAspectCrop(
        { unit: "px", width: (width * cropInitialWidth) / 100 },
        cropAspect,
        width,
        height
      );
      const centerCropObj = centerCrop(aspectCropObj, width, height);
      setCrop(centerCropObj);
    },
    [cropAspect, cropInitialWidth]
  );

  const onCompleteHandler = () => {
    if (!image || !crop) {
      console.error("Cropper Error");
      return;
    }

    const ratio = image.naturalWidth / image.width;

    const drawParams = {
      sx: crop.x * ratio,
      sy: crop.y * ratio,
      width: crop.width * ratio,
      height: crop.height * ratio,
    };

    const canvas = document.createElement("canvas");
    canvas.width = drawParams.width;
    canvas.height = drawParams.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Cropper Error");
      return;
    }

    ctx.drawImage(
      image,
      drawParams.sx,
      drawParams.sy,
      drawParams.width,
      drawParams.height,
      0,
      0,
      drawParams.width,
      drawParams.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          console.error("Cropper Error");
          return;
        }
        setImageField(blob);
      },
      "image/png",
      1
    );
    canvas.remove();

    handleCloseModal();
  };

  return (
    <>
      <AppDialog
        dividers
        maxWidth="md"
        open={show}
        onClose={() => handleCloseModal()}
        title={<IntlMessages id="cropper.cropImage" />}
      >
        <Box sx={{
          display: "flex",
          justifyContent: "center"
        }}
        >
          {imageUrl && (
            <ReactCrop
              aspect={cropAspect}
              crop={crop}
              onChange={setCrop}
            >
              <img
                alt={""}
                src={imageUrl}
                onLoad={imageOnLoadHandler}
              />
            </ReactCrop>
          )}
        </Box>
        <DialogActions
          sx={{
            p: 0, pt: 1
          }}
        >
          <Button
            sx={{
              minWidth: 100
            }}
            variant="outlined"
            color="primary"
            type="submit"
            onClick={() => onCompleteHandler()}
          >
            {<IntlMessages id="cropper.actionButton" />}
          </Button>
        </DialogActions>
      </AppDialog>
    </>
  );
};

export default ImageCropModal;
