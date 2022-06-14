import { useMemo } from "react";
import { useTable, useFilters } from "react-table";
import { DefaultColumnFilter } from "./Filters";
import IconButton from "@mui/material/IconButton";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./styles.module.css";

export default function ProductsTable({
  data,
  onProductSelect,
  isMoveDisabled,
}) {
  const columns = useMemo(
    () => [
      {
        accessor: "sku",
        Header: "SKU",
      },
      {
        accessor: "name",
        Header: "Name",
      },
      {
        id: "attributes",
        Header: "Attributes",
        accessor: (row) => {
          let combined = "";
          row.attributes.forEach(({ value }) => {
            combined += `${value} `;
          });
          return combined;
        },
        Cell: ({ row }) =>
          row.original.attributes.map(({ name, value }) => (
            <div key={name}>
              <span className={styles.capitalize}>{name}:</span> {value}
            </div>
          )),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
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
    <div className={styles.tableContainer}>
      <table {...getTableProps()} className={styles.table}>
        <thead className={styles.thead}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {column.canFilter ? (
                    <div>{column.render("Filter")}</div>
                  ) : null}
                </th>
              ))}
              <th className={styles.actionWidth}></th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={styles.tbody}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}

                <td className={styles.actionWidth}>
                  <IconButton
                    className={styles.moveButton}
                    onClick={() => {
                      onProductSelect(row.original);
                    }}
                    disabled={isMoveDisabled}
                  >
                    <ArrowForwardIosIcon
                      sx={{
                        fontSize: (theme) => theme.typography.button.fontSize,
                        color: (theme) => theme.palette.primary.main,
                      }}
                    />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
