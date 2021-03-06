import React, { useCallback, useEffect, useState } from "react";
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
  onCloseAddSlide: (data?: any[]) => void;
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
    image: yup
      .mixed()
      .test("required", "", () => !!imageAsFile || isEdit),
    title: yup
      .string()
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
      .max(30,
        (String([
          messages["common.validation.maxLengthFirstPart"],
          30,
          messages["common.validation.maxLengthSecondPart"]]
          .join("\u0020"))))
      .test("button_1_name", String(
        messages["sliderSettings.form.validation.buttonIsReqired"]),
        (value: string, schema) =>
          !(!!schema.parent.button_1_action && !value)),
    button_1_action: yup
      .string()
      .max(500,
        (String([
          messages["common.validation.maxLengthFirstPart"],
          500,
          messages["common.validation.maxLengthSecondPart"]]
          .join("\u0020"))))
      .test("button_1_action", String(
        messages["sliderSettings.form.validation.actionIsReqired"]),
        (value: string, schema) =>
          !(!!schema.parent.button_1_name && !value)),
    button_2_name: yup
      .string()
      .max(30,
        (String([
          messages["common.validation.maxLengthFirstPart"],
          30,
          messages["common.validation.maxLengthSecondPart"]]
          .join("\u0020"))))
      .test("button_2_name", String(
        messages["sliderSettings.form.validation.buttonIsReqired"]),
        (value: string, schema) =>
          !(!!schema.parent.button_2_action && !value)),
    button_2_action: yup
      .string()
      .max(500,
        (String([
          messages["common.validation.maxLengthFirstPart"],
          500,
          messages["common.validation.maxLengthSecondPart"]]
          .join("\u0020"))))
      .test("button_2_action", String(
        messages["sliderSettings.form.validation.actionIsReqired"]),
        (value: string, schema) =>
          !(!!schema.parent.button_2_name && !value)),
  });

  const [showCropModal, setShowCropModal] = useState<boolean>(false);
  const [isParentModalVisible, setIsParentModalVisible] = useState<boolean>(true);

  const { baseUrl } = getDotEnvConfiguration();
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageAsFile, saveImageAsFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(
    isEdit && initialSliderData && initialSliderData.image !== "" ?
      baseUrl.concat(initialSliderData.image) :
      SLIDER_IMAGE_PLACEHOLDER); // TODO handle this to execute only once (first time rendered) somehow -istevanovic
  useEffect(() => {
    if (isEdit)
      setPreviewImage(
        initialSliderData && initialSliderData.image ?
          baseUrl.concat(initialSliderData.image) :
          SLIDER_IMAGE_PLACEHOLDER);
  }, [isEdit, initialSliderData, baseUrl]);

  const setImageField = (file: File | undefined) => {
    if (file && typeof file.name === 'undefined') {
      saveImageAsFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  const startImageCrop = useCallback(
    (file: File | undefined) => {
      //set image on cropper and open it
      setImageUrl(URL.createObjectURL(file));
      // setIsParentModalVisible(false);
      setShowCropModal(true);
    }, []);



  const resetAllValues = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setImageUrl(undefined);
    saveImageAsFile(null);
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
        cropAspect={147 / 61}// For container dimension on Emissary app - 1176 x 488 px
      />
      <AppDialog
        dividers
        maxWidth="md"
        height="590px"
        width="800px"
        open={isAddNewSlideOpen && isParentModalVisible}
        onClose={resetAllValues}
        title={<IntlMessages id="sliderSettings.form.addEditTitle" />}
      >
        <Formik
          validateOnChange={true}
          enableReinitialize={true}
          initialValues={initialSliderData} // TODO handle when opening Cropper due to setShowParent on Crop Component
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            if (isEdit) {
              let formData = objectToFormData({
                ...data,
                image: imageAsFile,
                _method: "PUT"
              });
              jwtAxios
                .post(`/admin/sliders/${String(sliderId)}`, formData)
                .then((response) => {
                  if (response.status === 200) {
                    setSubmitting(false);
                    onCloseAddSlide(response.data.data);
                  } else {
                    console.error("Update slide");
                  }
                })
                .catch((error) => {
                  console.error("Update slide", error);
                });
            } else {
              let formData = objectToFormData({
                ...data,
                image: imageAsFile
              });
              jwtAxios
                .post("/admin/sliders", formData)
                .then((response) => {
                  if (response.status === 200) {
                    setSubmitting(false);
                    onCloseAddSlide(response.data.data);
                  } else {
                    console.error("Update slide");
                  }
                })
                .catch((error) => {
                  console.error("Update slide", error);
                });
            }
            onCloseAddSlide();
            resetAllValues();
            resetForm();
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
