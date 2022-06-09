import { useMemo } from "react";
import { useTable, useFilters } from "react-table";
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

export default function ProductsTable({ data, onProductSelect }) {
  const columns = useMemo(
    () => [
      {
        accessor: "sku",
        Header: "Sku",
      },
      {
        accessor: "name",
        Header: "Name",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <Button
            onClick={() => {
              onProductSelect(row.original);
            }}
          >
            &minus;&gt;
          </Button>
        ),
      },
    ],
    [onProductSelect]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      autoResetFilters: false,
      autoResetGlobalFilter: false,
    },
    useFilters
  );

  return (
    <div className="tableContainer">
      <Table {...getTableProps()}>
        <TableHead className="tableHead">
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
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
