import { useState, useEffect } from "react";
import { Box, Grid, TextField } from "@mui/material";

import VariationsTable from "./VariationsTable";
import ProductsTable from "./ProductsTable";

// MODAL

import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import jwtAxios from "@crema/services/auth/jwt-auth";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, fontSize: 24 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

// ENDMODAL

function ProductVariations() {
  const [products, setProducts] = useState([]);
  const [variations, setVariations] = useState([]);
  const [selectedVariationId, setSelectedVariationId] = useState("");

  useEffect(() => {
    jwtAxios.get(`admin/variations`).then(({ data: { data } }) => {
      const { variations, products } = data;

      setProducts(products);
      setVariations(variations);
    });
  }, []);

  const onProductSelect = (product: any) => {
    if (selectedVariationId === "") {
      return;
    }

    const variationIndex = variations.findIndex((variation) => {
      return variation.id === selectedVariationId;
    });

    const variationProducts = variations[variationIndex].products;

    if (variationProducts.findIndex(({ id }) => id === product.id) >= 0) {
      return;
    }

    jwtAxios
      .post(`admin/variations/set-product-variation`, {
        product_id: product.id,
        variation_id: selectedVariationId,
      })
      .then(() => {
        const productsCopy = [...products];
        const variationsCopy = [...variations];
        const productIndex = productsCopy.findIndex(({ id }) => {
          return id === product.id;
        });

        productsCopy.splice(productIndex, 1);
        variationProducts.push(product);

        variationsCopy[variationIndex].products = variationProducts;

        setProducts(productsCopy);
        setVariations(variationsCopy);
      })
      .catch(() => {});
  };

  const onProductDeselect = (product: any) => {
    jwtAxios
      .post(`admin/variations/unset-product-variation`, {
        product_id: product.id,
      })
      .then(() => {
        const variationIndex = variations.findIndex((variation) => {
          return variation.id === selectedVariationId;
        });

        const variationProductIndex = variations[
          variationIndex
        ].products.findIndex(({ id }) => {
          return id === product.id;
        });

        const productsCopy = [...products];
        const variationsCopy = [...variations];
        const variationProducts = variations[variationIndex].products;

        const [spliced] = variationProducts.splice(variationProductIndex, 1);
        productsCopy.push(spliced);

        variationsCopy[variationIndex].products = variationProducts;

        setProducts(productsCopy);
        setVariations(variationsCopy);
      })
      .catch(() => {});
  };

  // Modal
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    jwtAxios
      .post(`admin/variations`, {
        note,
      })
      .then(({ data: { data } }) => {
        const variationsCopy = [...variations];

        variationsCopy.push(data);

        setVariations(variationsCopy);
        setNote("");
        setOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box>
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Button variant="outlined" onClick={handleOpen}>
            Create Variation
          </Button>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              Modal title
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  id="outlined-required"
                  label="Note"
                  onChange={({ target }) => {
                    setNote(target.value);
                  }}
                  defaultValue={note}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" autoFocus onClick={handleSubmit}>
                Save
              </Button>
              <Button variant="outlined" color="error" onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </Grid>
      </Grid>
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <ProductsTable data={products} onProductSelect={onProductSelect} />
        </Grid>
        <Grid item xs={6}>
          <VariationsTable
            data={variations}
            selectedVariationId={selectedVariationId}
            setSelectedVariationId={setSelectedVariationId}
            onProductDeselect={onProductDeselect}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductVariations;
