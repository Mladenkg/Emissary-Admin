import { useCallback, useMemo, useState } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  Row,
  IdType,
} from "react-table";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { DefaultColumnFilter } from "./Filters";

import "./styles.css";

export default function VariationsTable({
  data,
  selectedVariationId,
  setSelectedVariationId,
  onProductDeselect,
}) {
  const variationProductsFilter = useCallback(
    (rows: Row<any>[], ids: IdType<any>[], query: string) => {
      const values = query
        .split(/\s*\,\s*/g)
        .filter((value) => !!value && value.length > 0)
        .map((value) => value.trim());

      return rows.filter(({ original: { products } }) =>
        values.every((value) => products.some(({ sku }) => sku.includes(value)))
      );
    },
    []
  );

  const columns = useMemo(
    () => [
      {
        accessor: "note",
        filter: "includes",
        Header: "Note",
        // Cell: ({ cell: { value } }) => value || "-",
        // Filter: SelectColumnFilter,
      },
      {
        accessor: ({ products }) => {
          return products.map(({ sku }) => sku).join(", ");
        },
        filter: variationProductsFilter,
        Header: "Products",
      },
    ],
    []
  );
  const globalFilter = useCallback(
    (rows: Row<any>[], ids: IdType<any>[], query: string) => {
      const values = query
        .split(/\s*\,\s*/g)
        .filter((value) => !!value && value.length > 0)
        .map((value) => value.trim());

      return rows.filter(({ original: { products } }) =>
        values.every((value) => products.some(({ sku }) => sku.includes(value)))
      );
    },
    []
  );

  const onRowClick = (variationId: string) => {
    setSelectedVariationId(
      selectedVariationId !== variationId ? variationId : ""
    );
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    visibleColumns,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      globalFilter,
      defaultColumn: { Filter: DefaultColumnFilter },
      autoResetFilters: false,
      autoResetGlobalFilter: false,
    },
    useFilters,
    useGlobalFilter
  );

  return (
    <div className="tableContainer">
      <Table {...getTableProps()}>
        <TableHead className="tableHead">
          {/* <TableRow>
          <TableCell
            colSpan={visibleColumns.length}
            style={{
              textAlign: "left",
            }}
          >
            <GlobalFilter globalFilter={""} setGlobalFilter={setGlobalFilter} />
          </TableCell>
        </TableRow> */}
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {column.canFilter ? (
                    <div>{column.render("Filter")}</div>
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { id, products } = row.original;
            const expanded =
              !!selectedVariationId && selectedVariationId === id;
            return [
              <TableRow {...row.getRowProps()} onClick={() => onRowClick(id)}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>,
              expanded && (
                <TableRow key={`products-${id}`}>
                  <TableCell
                    colSpan={visibleColumns.length}
                    style={{
                      backgroundColor: "#fafafa",
                    }}
                  >
                    {products.map((product) => (
                      <div key={product.id}>
                        <Button
                          onClick={() => {
                            onProductDeselect(product);
                          }}
                        >
                          &lt;&minus;
                        </Button>
                        <span>{product.name}</span>
                        <span>{product.sku}</span>
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ),
            ];
          })}
        </TableBody>
      </Table>
    </div>
  );
}
