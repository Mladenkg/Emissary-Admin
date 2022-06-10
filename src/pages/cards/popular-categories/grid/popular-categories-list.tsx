import React, { useCallback, useEffect, useState } from "react";
import jwtAxios from "@crema/services/auth/jwt-auth";
import EditCategory from "../edit-category";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import ArrowUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowDownIcon from "@mui/icons-material/ArrowCircleDown";
import { EditRounded } from "@mui/icons-material";
import { PopularCategoriesData } from "../../../../types/models/PopularCategories";

const columns: GridColDef[] = [
  {
    field: "position",
    headerName: "№ Position",
    sortable: false,
    width: 96,
    renderCell: (params) => {
      return (
        <Box sx={{ p: 0, mx: 0, fontWeight: "medium", fontSize: 14 }} >
          <span style={{ display: "inline-block", width: "6px", }} >
            {params.row.position}
          </span>
          <IconButton
            disabled={params.row.position === 1}
            data-category-action-name="action-up"
            sx={{ p: 2, mx: 0 }} >
            <ArrowUpIcon />
          </IconButton>
          <IconButton
            data-category-action-name="action-down"
            disabled={params.row.last}
            sx={{ p: 2, mx: -2 }} >
            <ArrowDownIcon />
          </IconButton>
        </Box>
      );
    }
  },
  {
    field: "edit",
    headerName: "",
    sortable: false,
    width: 46,
    renderCell: (params) => {
      return (
        <Box sx={{ p: 0, mx: -1 }} >
          <IconButton
            data-category-action-name="action-edit"
            sx={{ p: 2, mx: 0 }} >
            <EditRounded />
          </IconButton>
        </Box >
      );
    }
  },
  {
    field: "title",
    headerName: "Title",
    flex: 0.4,
    minWidth: 200,
    sortable: false,
    valueGetter: (params) => {
      return params.row.content.title;
    }
  },
  {
    field: "action",
    headerName: "Explore action",
    flex: 0.6,
    sortable: false,
    width: 300,
    valueGetter: (params) => {
      return params.row.content.action;
    }
  }
];

export default function CategoryList() {
  const [data, setData] = useState([]);

  const updateGrid = useCallback((data: any[]) => {
    let len = data.length;
    len--;
    setData(data.map((row, index) =>
      index === len ? { ...row, last: true } : { ...row, last: false }));
  }, []);
  const fetchGridData = useCallback(() => {
    jwtAxios
      .get("/admin/categories/popular")
      .then((response) => {
        if (response.status === 200) {
          updateGrid(response.data.data);
        } else {
          console.error("Load categories");
        }
      })
      .catch((error) => {
        console.error("Load categories", error);
      });
  }, [updateGrid]);

  useEffect(() => {
    fetchGridData();
  }, [fetchGridData]);

  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState<boolean>(false);
  const [selectedPopularCategoriesData, setSelectedPopularCategoriesData] = useState<PopularCategoriesData | null>({
    title: "",
    action: "",
    image: ""
  });

  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

  const onOpenEditCategory = (rowIndex: number | undefined) => {
    if (rowIndex !== undefined) {
      setCategoryId(data[rowIndex].id);
      var record = data[rowIndex].content;
      setSelectedPopularCategoriesData({
        title: record.title || "",
        action: record.action || "",
        image: record.image || ""
      });
    }
    setIsEditCategoryOpen(true);
  };

  const onCloseEditCategory = (data: any[]) => {
    setSelectedPopularCategoriesData({
      title: "",
      action: "",
      image: ""
    });
    //refresh grid
    if (data)
      updateGrid(data);
    setIsEditCategoryOpen(false);
  };

  const [gridUpading, setGridUpading] = useState<boolean>(false);
  const handleUpdateRows = (rowIndex: number, categoryId: string, action: string) => {
    setData((data) => {
      let newPosition = action === "up" ? rowIndex - 1 : rowIndex + 1;
      if (newPosition !== -1 && newPosition < data.length && !gridUpading) {
        let formData = {
          position: newPosition + 1
        };
        setGridUpading(true);
        jwtAxios
          .post(`/admin/categories/${categoryId}/position`, formData)
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
    let actionElement = e.target.closest("[data-category-action-name]")// not for IE -istevanovic
    if (actionElement && actionElement.dataset) {
      let action = actionElement.dataset.categoryActionName;
      action = action.split("-")[1];
      let rowElement = actionElement.parentElement.parentElement.parentElement;
      let rowIndex = Number(rowElement.dataset.rowindex);
      let categoryId = String(rowElement.dataset.id);
      switch (action) {
        case "up":
        case "down":
          handleUpdateRows(rowIndex, categoryId, action);
          break;
        case "edit":
          onOpenEditCategory(rowIndex);
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
          onCellClick={handleOnCellClick}
          disableColumnMenu
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[]}
          hideFooter={true} />
      </Box >
      <EditCategory
        isEditCategoryOpen={isEditCategoryOpen}
        categoryId={categoryId}
        initialPopularCategoriesData={selectedPopularCategoriesData}
        onCloseEditCategory={onCloseEditCategory} />
    </>
  );
}
