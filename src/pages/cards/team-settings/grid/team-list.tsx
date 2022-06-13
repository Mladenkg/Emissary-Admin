import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import jwtAxios from "@crema/services/auth/jwt-auth";
import IntlMessages from "@crema/utility/IntlMessages";
import AddEditMember from "../add-edit-member";
import PreviewMember from "../preview-member";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Card, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DeleteForeverRounded, EditRounded, VisibilityRounded } from "@mui/icons-material";
import { TeamMemberData } from "../../../../types/models/TeamSettings";

const columns: GridColDef[] = [
  {
    field: "ations",
    headerName: "Actions",
    sortable: false,
    width: 116,
    renderCell: (params) => {
      return (
        <Box sx={{ p: 0, mx: -1 }} >
          <IconButton
            data-team-member-action-name="action-view"
            sx={{ p: 2, mx: 0 }} >
            <VisibilityRounded />
          </IconButton>
          <IconButton
            data-team-member-action-name="action-edit"
            sx={{ p: 2, mx: -2 }} >
            <EditRounded />
          </IconButton>
          <IconButton
            data-team-member-action-name="action-delete"
            sx={{ p: 2, mx: 0 }} >
            <DeleteForeverRounded />
          </IconButton>
        </Box >
      );
    }
  },
  {
    field: "name",
    headerName: "Member name",
    flex: 0.5,
    minWidth: 150,
    sortable: false,
    valueGetter: (params) => {
      return params.row.name;
    }
  },
  {
    field: "position",
    headerName: "Role (position in company)",
    minWidth: 150,
    sortable: false,
    flex: 0.5,
    valueGetter: (params) => {
      return params.row.position;
    }
  }
];
export function CustomNoRowsOverlay() {
  return (
    <Card
      sx={{
        padding: 5,
        borderRadius: 0,
        textAlign: "center",
        color: "inherit",
        backgroundColor: (theme) => theme.palette.background.default,
      }} >
      <Typography
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontSize: 18,
          fontWeight: "bold",
          color: (theme) => theme.palette.grey[400]
        }} >
        <IntlMessages id="teamSettings.noTeamMembers" />
      </Typography>
    </Card>
  );
}

export default function TeamMemberList() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const updateGrid = useCallback((data: any[]) => {
    let len = data.length;
    len--;
    setData(data.map((row, index) =>
      index === len ? { ...row, last: true } : { ...row, last: false }));
  }, []);
  const fetchGridData = useCallback(() => {
    jwtAxios
      .get("/admin/team")
      .then((response) => {
        if (response.status === 200) {
          updateGrid(response.data.data);
        } else {
          console.error("Load member list");
        }
      })
      .catch((error) => {
        console.error("Load member list", error);
      });
  }, [updateGrid]);

  useEffect(() => {
    fetchGridData();
  }, [fetchGridData]);

  const [isAddEditMemberOpen, setIsAddEditMemberOpen] = useState<boolean>(false);
  const [isEditMember, setIsEditMember] = useState<boolean>(false);
  const [selectedTeamMemberData, setSelectedTeamMemberData] = useState<TeamMemberData | null>({
    name: "",
    position: "",
    image: ""
  });

  const [memberId, setMemberId] = useState<number | undefined>(undefined);

  const [isMemberPreviewOpen, setIsMemberPreviewOpen] = useState<boolean>(false);
  const onOpenViewMember = (rowIndex: number | undefined) => {
    var record = data[rowIndex];
    setSelectedTeamMemberData({
      name: record.name || "",
      position: record.position || "",
      image: record.image || ""
    });
    setIsMemberPreviewOpen(true);
  };
  const onCloseMemberPreview = () => {
    setSelectedTeamMemberData({
      name: "",
      position: "",
      image: ""
    });
    setIsMemberPreviewOpen(false);
  };


  const onOpenAddEditMember = (rowIndex: number | undefined) => {
    if (rowIndex !== undefined) {
      setIsEditMember(true);
      setMemberId(data[rowIndex].id);
      var record = data[rowIndex];
      setSelectedTeamMemberData({
        name: record.name || "",
        position: record.position || "",
        image: record.image || ""
      });
    }
    setIsAddEditMemberOpen(true);
  };


  const onCloseAddEditMember = () => {
    setSelectedTeamMemberData({
      name: "",
      position: "",
      image: ""
    });
    fetchGridData();
    setIsEditMember(false);
    setIsAddEditMemberOpen(false);
  };

  const handleDeleteRow = (row: number, memberId: string) => {
    jwtAxios
      .delete(`/admin/team/${memberId}`)
      .then((reponse) => {
        if (reponse.status === 200) {
          fetchGridData();
        } else {
          console.error("Delete team member");
        }
      })
      .catch((error) => {
        console.error("Delete team member", error);
      });
  };


  const handleOnCellClick = (params: any, e: any) => {
    let actionElement = e.target.closest("[data-team-member-action-name]")// not for IE -istevanovic
    if (actionElement && actionElement.dataset) {
      let action = actionElement.dataset.teamMemberActionName;
      action = action.split("-")[1];
      let rowElement = actionElement.parentElement.parentElement.parentElement;
      let rowIndex = Number(rowElement.dataset.rowindex);
      let memberId = String(rowElement.dataset.id);
      switch (action) {
        case "view":
          onOpenViewMember(rowIndex);
          break;
        case "edit":
          onOpenAddEditMember(rowIndex);
          break;
        case "delete":
          handleDeleteRow(rowIndex, memberId);
          break;
        default:
          break;
      };
    }
  };

  return (
    <>
      <Box>
        <DataGrid
          autoHeight
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          onCellClick={handleOnCellClick}
          disableColumnMenu
          rows={data}
          columns={columns}
          pageSize={12}
          rowsPerPageOptions={[]}
          hideFooter={true} />
        <Box sx={{ p: 2, mx: 5 }}>
          <Box component="div" sx={{ display: "inline" }}>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              sx={{
                padding: "8px 20px",
                borderRadius: 1,
                "& .MuiSvgIcon-root": {
                  fontSize: 24,
                }
              }}
              startIcon={<AddIcon />}
              onClick={() => onOpenAddEditMember(undefined)} >
              <IntlMessages id="teamSettings.addNewTeamMember" />
            </Button>
          </Box>
        </Box>
      </Box >
      <AddEditMember
        isAddEditMemberOpen={isAddEditMemberOpen}
        isEdit={isEditMember}
        memberId={memberId}
        initialTeamMemberData={selectedTeamMemberData}
        onCloseAddEditMember={onCloseAddEditMember} />
      <PreviewMember
        isMemberPreviewOpen={isMemberPreviewOpen}
        initialTeamMemberData={selectedTeamMemberData}
        onCloseMemberPreview={onCloseMemberPreview} />
    </>
  );
}
