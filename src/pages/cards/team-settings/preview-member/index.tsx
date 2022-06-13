import React, { useEffect, useState } from "react";
import { MEMBER_IMAGE_PLACEHOLDER } from "../../../../config/common/member-image";
import { getDotEnvConfiguration } from "../../../../config";
import { TeamMemberData } from "../../../../types/models/TeamSettings";
import AppDialog from "@crema/core/AppDialog";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";

interface MemberPreviewProps {
  onCloseMemberPreview: () => void;
  initialTeamMemberData?: TeamMemberData | null;
  isMemberPreviewOpen: boolean;
}

const MemberPreview: React.FC<MemberPreviewProps> = ({
  onCloseMemberPreview,
  initialTeamMemberData,
  isMemberPreviewOpen,
}) => {

  const { baseUrl } = getDotEnvConfiguration();

  const [previewImage, setPreviewImage] = useState(
    initialTeamMemberData && initialTeamMemberData.image ?
      baseUrl.concat(initialTeamMemberData.image) :
      MEMBER_IMAGE_PLACEHOLDER);

  useEffect(() => {
    setPreviewImage(
      initialTeamMemberData && initialTeamMemberData.image ?
        baseUrl.concat(initialTeamMemberData.image) :
        MEMBER_IMAGE_PLACEHOLDER);
  }, [initialTeamMemberData, baseUrl]);

  return (
    <>
      <AppDialog
        height="515px"
        onClose={onCloseMemberPreview}
        open={isMemberPreviewOpen}
        width="415px" >
        <Box
          sx={{
            p: 0,
            pl: 0,
            height: 0
          }} >
          <CardMedia
            alt=""
            component="img"
            image={previewImage} />
          <Box
            sx={{
              pt: 5,
            }}
            color="#4c4c4c"
            fontSize={"18px"}
            fontWeight={"400"} >
            {initialTeamMemberData ? initialTeamMemberData.name : ""}
          </Box>
          <Box
            sx={{
              pt: 1
            }}
            color="#4c4c4c"
            fontSize={"18px"}
            fontWeight={"300"} >
            {initialTeamMemberData ? initialTeamMemberData.position : ""}
          </Box>
        </Box>
      </AppDialog>
    </>
  );
};

export default MemberPreview;
