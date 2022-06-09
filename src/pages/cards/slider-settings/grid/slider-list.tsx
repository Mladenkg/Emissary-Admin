import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import jwtAxios from "@crema/services/auth/jwt-auth";
import IntlMessages from "@crema/utility/IntlMessages";
import AddNewSlide from "../add-new-slide";
import { onDeleteSlide } from "../../../../redux/actions";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Card, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowDownIcon from "@mui/icons-material/ArrowCircleDown";
import { DeleteForeverRounded, EditRounded, VisibilityRounded } from "@mui/icons-material";
import { SliderData } from "../../../../types/models/SliderSettings";

const columns: GridColDef[] = [
  {
    field: "position",
    headerName: "№ Position",
    sortable: false,
    width: 96,
    renderCell: (params) => {
      return (
        <Box sx={{ p: 0, mx: 0, fontWeight: 'medium', fontSize: 14 }} >
          <span style={{ display: "inline-block", width: "6px", }}>
            {params.row.position}
          </span>
          <IconButton
            disabled={params.row.position === 1}
            data-slide-action-name="action-up"
            sx={{ p: 2, mx: 0 }}
          >
            <ArrowUpIcon />
          </IconButton>
          <IconButton
            data-slide-action-name="action-down"
            disabled={params.row.last}
            sx={{ p: 2, mx: -2 }}
          >
            <ArrowDownIcon />
          </IconButton>
        </Box>
      );
    }
  },
  {
    field: 'ations',
    headerName: 'Actions',
    sortable: false,
    width: 116,
    renderCell: (params) => {
      return (
        <Box sx={{ p: 0, mx: -1 }} >
          <IconButton
            data-slide-action-name="action-view"
            sx={{ p: 2, mx: 0 }}
          >
            <VisibilityRounded />
          </IconButton>
          <IconButton
            data-slide-action-name="action-edit"
            sx={{ p: 2, mx: -2 }}
          >
            <EditRounded />
          </IconButton>
          <IconButton
            data-slide-action-name="action-delete"
            sx={{ p: 2, mx: 0 }}
          >
            <DeleteForeverRounded />
          </IconButton>
        </Box >
      );
    },
  },
  {
    field: "title",
    headerName: "Title",
    flex: 0.3,
    minWidth: 150,
    sortable: false,
    valueGetter: (params) => {
      return params.row.content.title;
    },
  },
  {
    field: "description",
    headerName: "Description",
    minWidth: 150,
    sortable: false,
    flex: 0.7,
    valueGetter: (params) => {
      return params.row.content.description;
    },
  },
  {
    field: "button_1_name",
    headerName: "Button 1 Name",
    sortable: false,
    width: 150,
    valueGetter: (params) => {
      return params.row.content.button_1_name;
    },
  },
  {
    field: "button_1_action",
    headerName: "Button 1 Description",
    hide: true,
    sortable: false,
    width: 100,
    valueGetter: (params) => {
      return params.row.content.button_1_action;
    },
  },
  {
    field: "button_2_name",
    headerName: "Button 2 Name",
    description: "This column has a value getter and is n.",
    sortable: false,
    width: 150,
    valueGetter: (params) => {
      return params.row.content.button_2_name;
    },
  },
  {
    field: "button_2_action",
    headerName: "Button 2 Description",
    hide: true,
    type: "string",
    sortable: false,
    width: 100,
    valueGetter: (params) => {
      return params.row.content.button_2_action;
    },
  },
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
      }}
    >
      <Typography
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontSize: 18,
          fontWeight: "bold",
          color: (theme) => theme.palette.grey[400]
        }}
      >
        <IntlMessages id="sliderSettings.atLeastOneSlide" />
      </Typography>
    </Card>
  );
}

export default function SliderList() {
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
      .get("/admin/sliders")
      .then((response) => {
        if (response.status === 200) {
          updateGrid(response.data.data);
        } else {
          console.error("Load slides");
        }
      })
      .catch((error) => {
        console.error("Load slides", error);
      });
  }, [updateGrid]);

  useEffect(() => {
    fetchGridData();
  }, [fetchGridData]);

  const [isAddNewSlideOpen, setAddTaskOpen] = useState<boolean>(false);
  const [isEditSlide, setIsEditSlide] = useState<boolean>(false);
  const [selectedSliderData, setSelectedSliderData] = useState<SliderData | null>({
    title: "",
    description: "",
    button_1_name: "",
    button_1_action: "",
    button_2_name: "",
    button_2_action: "",
    image: "",
  });
  const [sliderId, setSliderId] = useState<number | undefined>(undefined);


  const onOpenViewSlide = (rowIndex: number | undefined) => {
  };

  const onOpenAddEditSlide = (rowIndex: number | undefined) => {
    if (rowIndex !== undefined) {
      setIsEditSlide(true);
      setSliderId(data[rowIndex].id);
      var record = data[rowIndex].content;
      setSelectedSliderData({
        title: record.title || "",
        description: record.description || "",
        button_1_name: record.button_1_name || "",
        button_1_action: record.button_1_action || "",
        button_2_name: record.button_2_name || "",
        button_2_action: record.button_2_action || "",
        image: record.image || "",
      });
    }
    setAddTaskOpen(true);
  };
  const onCloseAddSlide = (data: any[]) => {
    setSelectedSliderData({
      title: "",
      description: "",
      button_1_name: "",
      button_1_action: "",
      button_2_name: "",
      button_2_action: "",
      image: "",
    });
    //refresh grid
    if (data)
      updateGrid(data);
    setIsEditSlide(false);
    setAddTaskOpen(false);
  };

  const [disabledAddNewSlide, setDisabledAddNewSlide] = useState<boolean>(false);
  const setGridState = (state: any) => {
    if (state && state.rows) {
      setDisabledAddNewSlide(state.rows.totalRowCount > 4);
    }
  }

  const handleDeleteRow = (row: number, sliderId: string) => {
    jwtAxios
      .delete(`/admin/sliders/${sliderId}`)
      .then((reponse) => {
        if (reponse.status === 200) {
          updateGrid(reponse.data.data);
        } else {
          console.error("Delete slide");
        }
      })
      .catch((error) => {
        console.error("Delete slide", error);
      });
  };

  const [gridUpading, setGridUpading] = useState<boolean>(false);
  const handleUpdateRows = (rowIndex: number, sliderId: string, action: string) => {
    setData((data) => {
      let newPosition = action === 'up' ? rowIndex - 1 : rowIndex + 1;
      if (newPosition !== -1 && newPosition < data.length && !gridUpading) {
        let formData = {
          position: newPosition + 1
        };
        setGridUpading(true);
        jwtAxios
          .post(`/admin/sliders/${sliderId}/position`, formData)
          .then((response) => {
            if (response.status === 200) {
              updateGrid(response.data.data);
              setTimeout(() => setGridUpading(false), 200);
            } else {
              console.error("Position change");
            }
          })
          .catch((error) => {
            console.error("Position change", error);
          });
      }
      return data;
    });
  };

  const handleOnCellClick = (params: any, e: any) => {
    let actionElement = e.target.closest("[data-slide-action-name]")// not for IE -istevanovic
    if (actionElement && actionElement.dataset) {
      let action = actionElement.dataset.slideActionName;
      action = action.split("-")[1];
      let rowElement = actionElement.parentElement.parentElement.parentElement;
      let rowIndex = Number(rowElement.dataset.rowindex);
      let sliderId = String(rowElement.dataset.id);
      switch (action) {
        case "up":
        case "down":
          handleUpdateRows(rowIndex, sliderId, action);
          break;
        case "view":
          onOpenViewSlide(rowIndex);
          break;
        case "edit":
          onOpenAddEditSlide(rowIndex);
          break;
        case "delete":
          handleDeleteRow(rowIndex, sliderId);
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
          onStateChange={(state) => setGridState(state)}
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          onCellClick={handleOnCellClick}
          disableColumnMenu
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[]}
          hideFooter={true}
        />
        <Box sx={{ p: 2, mx: 5 }}>
          <Box component="div" sx={{ display: "inline" }}>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              disabled={disabledAddNewSlide}
              sx={{
                padding: "8px 20px",
                borderRadius: 1,
                "& .MuiSvgIcon-root": {
                  fontSize: 24,
                },
              }}
              startIcon={<AddIcon />}
              onClick={() => onOpenAddEditSlide(undefined)}
            >
              <IntlMessages id="sliderSettings.addNewSlider" />
            </Button>
          </Box>
          {disabledAddNewSlide ? (
            <Box component="div" sx={{
              pl: 6,
              display: "inline", color: (theme) => theme.palette.warning.main
            }}>
              <IntlMessages id="sliderSettings.form.maxNumberOfSlidesReached" />
            </Box>
          ) : null}
        </Box>
      </Box >
      <AddNewSlide
        isAddNewSlideOpen={isAddNewSlideOpen}
        isEdit={isEditSlide}
        sliderId={sliderId}
        initialSliderData={selectedSliderData}
        onCloseAddSlide={onCloseAddSlide}
      />
    </>
  );
}
