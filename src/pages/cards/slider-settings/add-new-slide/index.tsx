import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import jwtAxios from "@crema/services/auth/jwt-auth";
import IntlMessages from "@crema/utility/IntlMessages";
import { useIntl } from "react-intl";
import objectToFormData from "./../../../../utils/api/object-to-form-data";
import { getDotEnvConfiguration } from "../../../../config";

import AppDialog from "@crema/core/AppDialog";
import AddSlideForm from "./slider-form";
import { SliderData } from "../../../../types/models/SliderSettings";
import { onAddNewSlide } from "../../../../redux/actions";
import { SLIDER_IMAGE_PLACEHOLDER } from "../../../../config/common/slider-image";
import ImageCropModal from "../../../../shared/image-crop-modal";

interface AddNewSlideProps {
  isAddNewSlideOpen: boolean;
  isEdit: boolean;
  sliderId: number | undefined;
  initialSliderData?: SliderData | null;
  onCloseAddSlide: () => void;
}

const AddNewSlide: React.FC<AddNewSlideProps> = ({
  isAddNewSlideOpen,
  isEdit,
  sliderId,
  initialSliderData,
  onCloseAddSlide,
}) => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    title: yup
      .string()
      .required(String(messages["common.validation.requiredField"]))
      .max(100,
        (String([
          messages["common.validation.maxLengthFirstPart"],
          100,
          messages["common.validation.maxLengthSecondPart"]]
          .join("\u0020")))),
    description: yup
      .string()
      .max(500,
        (String([
          messages["common.validation.maxLengthFirstPart"],
          500,
          messages["common.validation.maxLengthSecondPart"]]
          .join("\u0020")))),
    button_1_name: yup
      .string()
      .max(100,
        (String([
          messages["common.validation.maxLengthFirstPart"],
          100,
          messages["common.validation.maxLengthSecondPart"]]
          .join("\u0020")))),
    button_2_name: yup
      .string()
      .max(100,
        (String([
          messages["common.validation.maxLengthFirstPart"],
          100,
          messages["common.validation.maxLengthSecondPart"]]
          .join("\u0020")))),
    button_1_action: yup
      .string()
      .max(500,
        (String([
          messages["common.validation.maxLengthFirstPart"],
          500,
          messages["common.validation.maxLengthSecondPart"]]
          .join("\u0020")))),
    button_2_action: yup
      .string()
      .max(500,
        (String([
          messages["common.validation.maxLengthFirstPart"],
          500,
          messages["common.validation.maxLengthSecondPart"]]
          .join("\u0020")))),
  });

  const [showCropModal, setShowCropModal] = useState<boolean>(false);
  const [isParentModalVisible, setIsParentModalVisible] = useState<boolean>(true);

  const { baseUrl } = getDotEnvConfiguration();

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState(isEdit && initialSliderData && initialSliderData.image !== "" ? baseUrl.concat(initialSliderData.image) : SLIDER_IMAGE_PLACEHOLDER);
  const [imageAsFile, saveImageAsFile] = useState<File | null>(null);



  const startImageCrop = useCallback(
    (file: File | undefined) => {
      //set image on cropper and open it
      setImageUrl(URL.createObjectURL(file));
      setIsParentModalVisible(false);
      setShowCropModal(true);
    }, []);

  const setImageField = (file: File | undefined) => {
    if (file && typeof file.name === 'undefined') {
      saveImageAsFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const resetAllValues = () => {
    if (previewImage) {
      URL.revokeObjectURL(imageUrl);
    }
    if (previewImage) {
      URL.revokeObjectURL(imageUrl);
    }
    setPreviewImage(SLIDER_IMAGE_PLACEHOLDER);
    onCloseAddSlide();
  };

  return (
    <>
      <ImageCropModal
        show={showCropModal}
        imageUrl={imageUrl}
        setShow={setShowCropModal}
        setShowParent={setIsParentModalVisible}
        setImageField={setImageField}
        cropAspect={147 / 61}// container dimension on Emissary app - 1176 x 488 px
      />
      <AppDialog
        dividers
        fullHeight={true}
        maxWidth="md"
        open={isAddNewSlideOpen && isParentModalVisible}
        onClose={resetAllValues}
        title={<IntlMessages id="sliderSettings.form.addEditTitle" />}
      >
        <Formik
          validateOnChange={true}
          enableReinitialize={true}
          initialValues={initialSliderData}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            if (isEdit) {
              let formData = objectToFormData({
                ...data,
                image: imageAsFile
              });
              jwtAxios
                .put(`/admin/sliders/${String(sliderId)}`, formData)
                .then((response) => {
                  if (response.status === 200) {
                    onCloseAddSlide();
                  } else {
                    console.error("Update slide");
                  }
                })
                .catch((error) => {
                  console.error("Update slide", error);
                });
            } else {
              dispatch(onAddNewSlide({
                ...data,
                image: imageAsFile
              }));
            }
            onCloseAddSlide();
            resetAllValues();
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, values }) => (
            <AddSlideForm
              values={values}
              imageUrl={previewImage}
              startImageCrop={startImageCrop}
              isSubmitting={isSubmitting}
            />
          )}
        </Formik>
      </AppDialog>
    </>
  );
};

export default AddNewSlide;
