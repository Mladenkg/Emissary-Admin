import React, { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import jwtAxios from "@crema/services/auth/jwt-auth";
import { useIntl } from "react-intl";
import objectToFormData from "../../../../utils/api/object-to-form-data";
import { getDotEnvConfiguration } from "../../../../config";

import AppDialog from "@crema/core/AppDialog";
import EditCategoryForm from "./category-form";
import { MegaMenuData } from "../../../../types/models/MegaMenuCategories";

import { MEGA_MENU_CATEGORY_IMAGE_PLACEHOLDER } from "../../../../config/common/category-image";
import ImageCropModal from "../../../../shared/image-crop-modal";

interface EditCategoryProps {
  isEditCategoryOpen: boolean;
  categoryId: number | undefined;
  initialMegaMenuData?: MegaMenuData | null;
  onCloseEditCategory: () => void;
}

const EditCategory: React.FC<EditCategoryProps> = ({
  isEditCategoryOpen,
  categoryId,
  initialMegaMenuData,
  onCloseEditCategory,
}) => {

  const { messages } = useIntl();

  const validationSchema = yup.object({
    image: yup
      .mixed()
      .test("required", "", () => !!imageAsFile || initialMegaMenuData.image.src !== "")
  });

  const [showCropModal, setShowCropModal] = useState<boolean>(false);
  const [isParentModalVisible, setIsParentModalVisible] = useState<boolean>(true);

  const { baseUrl } = getDotEnvConfiguration();
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageAsFile, saveImageAsFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(
    initialMegaMenuData && initialMegaMenuData.image && initialMegaMenuData.image.src !== "" ?
      baseUrl.concat(initialMegaMenuData.image.src) :
      MEGA_MENU_CATEGORY_IMAGE_PLACEHOLDER); // TODO handle this to execute only once (first time rendered) somehow -istevanovic
  useEffect(() => {
    setPreviewImage(
      initialMegaMenuData && initialMegaMenuData.image && initialMegaMenuData.image.src !== "" ?
        baseUrl.concat(initialMegaMenuData.image.src) :
        MEGA_MENU_CATEGORY_IMAGE_PLACEHOLDER);
  }, [baseUrl, initialMegaMenuData]);

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
    setPreviewImage(MEGA_MENU_CATEGORY_IMAGE_PLACEHOLDER);
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
        cropAspect={56 / 13}// For container dimension on Emissary app - 560 x 130px
      />
      <AppDialog
        dividers
        maxWidth="md"
        height="300px"
        width="600px"
        open={isEditCategoryOpen && isParentModalVisible}
        onClose={resetAllValues}
        title={(String([
          messages["megaMenuSettings.form.editTitle"],
          initialMegaMenuData.title]
          .join("\u0020")))} >
        <Formik
          validateOnChange={true}
          enableReinitialize={true}
          initialValues={initialMegaMenuData}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            if (!!imageAsFile) {
              let formData = objectToFormData({
                ...data,
                image: imageAsFile
              });
              jwtAxios
                .post(`/admin/mega-menu/${String(categoryId)}/add-image`, formData)
                .then((response) => {
                  if (response.status === 200) {
                    setSubmitting(false);
                    onCloseEditCategory();
                  } else {
                    console.error("Update mega menu category image");
                  }
                })
                .catch((error) => {
                  console.error("Update mega menu category image", error);
                });
            }
            onCloseEditCategory();
            resetAllValues();
            resetForm();
          }} >
          {({ isSubmitting, values }) => (
            <EditCategoryForm
              values={values}
              imageUrl={previewImage}
              startImageCrop={startImageCrop}
              isSubmitting={isSubmitting} />
          )}
        </Formik>
      </AppDialog>
    </>
  );
};

export default EditCategory;
