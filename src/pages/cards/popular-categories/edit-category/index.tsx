import React, { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import jwtAxios from "@crema/services/auth/jwt-auth";
import IntlMessages from "@crema/utility/IntlMessages";
import { useIntl } from "react-intl";
import objectToFormData from "./../../../../utils/api/object-to-form-data";
import { getDotEnvConfiguration } from "../../../../config";

import AppDialog from "@crema/core/AppDialog";
import EditCategoryForm from "./category-form";
import { PopularCategoryData } from "../../../../types/models/PopularCategories";
import { CATEGORY_IMAGE_PLACEHOLDER } from "../../../../config/common/category-image";
import ImageCropModal from "../../../../shared/image-crop-modal";

interface EditCategoryProps {
  isEditCategoryOpen: boolean;
  categoryId: number | undefined;
  initialPopularCategoryData?: PopularCategoryData | null;
  onCloseEditCategory: (data?: any[]) => void;
}

const EditCategory: React.FC<EditCategoryProps> = ({
  isEditCategoryOpen,
  categoryId,
  initialPopularCategoryData,
  onCloseEditCategory,
}) => {
  const { messages } = useIntl();
  const validationSchema = yup.object({
    title: yup
      .string()
      .required(String(
        messages["common.validation.requiredField"]))
      .max(30,
        (String([
          messages["common.validation.maxLengthFirstPart"],
          30,
          messages["common.validation.maxLengthSecondPart"]]
          .join("\u0020")))),
    action: yup
      .string()
      .required(String(
        messages["common.validation.requiredField"]))
      .max(500,
        (String([
          messages["common.validation.maxLengthFirstPart"],
          500,
          messages["common.validation.maxLengthSecondPart"]]
          .join("\u0020"))))
  });

  const [showCropModal, setShowCropModal] = useState<boolean>(false);
  const [isParentModalVisible, setIsParentModalVisible] = useState<boolean>(true);

  const { baseUrl } = getDotEnvConfiguration();
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageAsFile, saveImageAsFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(
    initialPopularCategoryData && initialPopularCategoryData.image !== "" ?
      baseUrl.concat(initialPopularCategoryData.image) :
      CATEGORY_IMAGE_PLACEHOLDER); // TODO handle this to execute only once (first time rendered) somehow -istevanovic
  useEffect(() => {
    setPreviewImage(
      initialPopularCategoryData && initialPopularCategoryData.image ?
        baseUrl.concat(initialPopularCategoryData.image) :
        CATEGORY_IMAGE_PLACEHOLDER);
  }, [baseUrl, initialPopularCategoryData]);

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
    setPreviewImage(CATEGORY_IMAGE_PLACEHOLDER);
    onCloseEditCategory();
  };

  return (
    <>
      <ImageCropModal
        show={showCropModal}
        imageUrl={imageUrl}
        setShow={setShowCropModal}
        setShowParent={setIsParentModalVisible}
        setImageField={setImageField}
        cropAspect={1}// For container dimension on Emissary app - 356 x 356 px
      />
      <AppDialog
        dividers
        maxWidth="md"
        height="480px"
        width="600px"
        open={isEditCategoryOpen && isParentModalVisible}
        onClose={resetAllValues}
        title={<IntlMessages id="popularCategories.form.editTitle" />}
      >
        <Formik
          validateOnChange={true}
          enableReinitialize={true}
          initialValues={initialPopularCategoryData}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            let formData = objectToFormData({
              ...data,
              image: imageAsFile,
              _method: "PUT"
            });
            jwtAxios
              .post(`/admin/categories/${String(categoryId)}/update-popular`, formData)
              .then((response) => {
                if (response.status === 200) {
                  setSubmitting(false);
                  onCloseEditCategory(response.data.data);
                } else {
                  console.error("Update category");
                }
              })
              .catch((error) => {
                console.error("Update category", error);
              });

            onCloseEditCategory();
            resetAllValues();
            resetForm();
          }}
        >
          {({ isSubmitting, values }) => (
            <EditCategoryForm
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

export default EditCategory;
