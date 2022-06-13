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
import MemberForm from "./member-form";
import { TeamMemberData } from "../../../../types/models/TeamSettings";
import { MEMBER_IMAGE_PLACEHOLDER } from "../../../../config/common/member-image";
import ImageCropModal from "../../../../shared/image-crop-modal";

interface AddEditMemberProps {
  isAddEditMemberOpen: boolean;
  isEdit: boolean;
  memberId: number | undefined;
  initialTeamMemberData?: TeamMemberData | null;
  onCloseAddEditMember: () => void;
}

const AddEditMember: React.FC<AddEditMemberProps> = ({
  isAddEditMemberOpen,
  isEdit,
  memberId,
  initialTeamMemberData,
  onCloseAddEditMember,
}) => {
  const { messages } = useIntl();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    image: yup
      .mixed()
      .test("required", "", () => !!imageAsFile || isEdit),
    name: yup
      .string()
      .required(String(
        messages["common.validation.requiredField"]))
      .max(100,
        (String([
          messages["common.validation.maxLengthFirstPart"],
          100,
          messages["common.validation.maxLengthSecondPart"]]
          .join("\u0020")))),
    position: yup
      .string()
      .required(String(
        messages["common.validation.requiredField"]))
      .max(100,
        (String([
          messages["common.validation.maxLengthFirstPart"],
          100,
          messages["common.validation.maxLengthSecondPart"]]
          .join("\u0020"))))
  });

  const [showCropModal, setShowCropModal] = useState<boolean>(false);
  const [isParentModalVisible, setIsParentModalVisible] = useState<boolean>(true);

  const { baseUrl } = getDotEnvConfiguration();
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageAsFile, saveImageAsFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(
    isEdit && initialTeamMemberData && initialTeamMemberData.image !== "" ?
      baseUrl.concat(initialTeamMemberData.image) :
      MEMBER_IMAGE_PLACEHOLDER); // TODO handle this to execute only once (first time rendered) somehow -istevanovic
  useEffect(() => {
    if (isEdit)
      setPreviewImage(
        initialTeamMemberData && initialTeamMemberData.image ?
          baseUrl.concat(initialTeamMemberData.image) :
          MEMBER_IMAGE_PLACEHOLDER);
  }, [isEdit, initialTeamMemberData, baseUrl]);

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
    setPreviewImage(MEMBER_IMAGE_PLACEHOLDER);
    onCloseAddEditMember();
  };

  return (
    <>
      <ImageCropModal
        show={showCropModal}
        imageUrl={imageUrl}
        setShow={setShowCropModal}
        setShowParent={setIsParentModalVisible}
        setImageField={setImageField}
        cropAspect={1}// For container dimension on Emissary app - 328 x 328 px
      />
      <AppDialog
        dividers
        maxWidth="md"
        height="480px"
        width="600px"
        open={isAddEditMemberOpen && isParentModalVisible}
        onClose={resetAllValues}
        title={<IntlMessages id="teamSettings.form.addEditTitle" />}
      >
        <Formik
          validateOnChange={true}
          enableReinitialize={true}
          initialValues={initialTeamMemberData} // TODO handle when opening Cropper due to setShowParent on Crop Component
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
                .post(`/admin/team/${String(memberId)}`, formData)
                .then((response) => {
                  if (response.status === 200) {
                    setSubmitting(false);
                    onCloseAddEditMember();
                  } else {
                    console.error("Update member");
                  }
                })
                .catch((error) => {
                  console.error("Update member", error);
                });
            } else {
              let formData = objectToFormData({
                ...data,
                image: imageAsFile
              });
              jwtAxios
                .post("/admin/team", formData)
                .then((response) => {
                  if (response.status === 200) {
                    setSubmitting(false);
                    onCloseAddEditMember();
                  } else {
                    console.error("Update member");
                  }
                })
                .catch((error) => {
                  console.error("Update member", error);
                });
            }
            onCloseAddEditMember();
            resetAllValues();
            resetForm();
          }}
        >
          {({ isSubmitting, values }) => (
            <MemberForm
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

export default AddEditMember;
