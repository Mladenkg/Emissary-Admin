import React, { useCallback, useEffect, useState } from "react";
import jwtAxios from "@crema/services/auth/jwt-auth";
import EditCategory from "../edit-category";
import PreviewCategory from "../preview-category-image"
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import { EditRounded, VisibilityRounded } from "@mui/icons-material";
import { MegaMenuData } from "../../../../types/models/MegaMenuCategories";

const columns: GridColDef[] = [
  {
    field: "edit",
    headerName: "Actions",
    sortable: false,
    width: 88,
    renderCell: (params) => {
      return (
        <Box sx={{ p: 0, mx: -1 }} >
          <IconButton
            disabled={params.row.content.image.src === ""}
            data-mega-menu-category-action-name="action-view"
            sx={{ p: 2, mx: 0 }} >
            <VisibilityRounded />
          </IconButton>
          <IconButton
            data-mega-menu-category-action-name="action-edit"
            sx={{ p: 2, mx: -1 }} >
            <EditRounded />
          </IconButton>
        </Box >
      );
    }
  },
  {
    field: "category",
    headerName: "Category",
    flex: 0.4,
    minWidth: 200,
    sortable: false,
    valueGetter: (params) => {
      return params.row.content.title;
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
      .get("/admin/mega-menu")
      .then((response) => {
        if (response.status === 200) {
          updateGrid(response.data.data);
        } else {
          console.error("Load mega menu categories");
        }
      })
      .catch((error) => {
        console.error("Load mega menu categories", error);
      });
  }, [updateGrid]);

  useEffect(() => {
    fetchGridData();
  }, [fetchGridData]);

  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState<boolean>(false);
  const [selectedMegaMenuData, setSelectedMegaMenuData] = useState<MegaMenuData | null>({
    title: "",
    image: ""
  });

  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

  const [isCategoryPreviewOpen, setIsCategoryPreviewOpen] = useState<boolean>(false);
  const onOpenViewCategory = (rowIndex: number | undefined) => {
    var record = data[rowIndex].content;
    setSelectedMegaMenuData({
      title: record.title || "",
      image: record.image || ""
    });
    setIsCategoryPreviewOpen(true);
  };
  const onCloseCategoryPreview = () => {
    setSelectedMegaMenuData({
      title: "",
      image: ""
    });
    setIsCategoryPreviewOpen(false);
  };

  const onOpenEditCategory = (rowIndex: number | undefined) => {
    if (rowIndex !== undefined) {
      setCategoryId(data[rowIndex].id);
      var record = data[rowIndex].content;
      setSelectedMegaMenuData({
        title: record.title || "",
        image: record.image || ""
      });
    }
    setIsEditCategoryOpen(true);
  };

  const onCloseEditCategory = () => {
    setSelectedMegaMenuData({
      title: "",
      image: ""
    });
    fetchGridData();
    setIsEditCategoryOpen(false);
  };

  const handleOnCellClick = (params: any, e: any) => {
    let actionElement = e.target.closest("[data-mega-menu-category-action-name]")// not for IE -istevanovic
    if (actionElement && actionElement.dataset) {
      let action = actionElement.dataset.megaMenuCategoryActionName;
      action = action.split("-")[1];
      let rowElement = actionElement.parentElement.parentElement.parentElement;
      let rowIndex = Number(rowElement.dataset.rowindex);
      switch (action) {
        case "view":
          onOpenViewCategory(rowIndex);
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
        initialMegaMenuData={selectedMegaMenuData}
        onCloseEditCategory={onCloseEditCategory} />
      <PreviewCategory
        isCategoryPreviewOpen={isCategoryPreviewOpen}
        initialMegaMenuData={selectedMegaMenuData}
        onCloseCategoryPreview={onCloseCategoryPreview} />
    </>
  );
}
