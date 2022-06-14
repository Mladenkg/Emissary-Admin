import { useCallback, useMemo } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  Row,
  IdType,
} from "react-table";
import { DefaultColumnFilter } from "./Filters";
import IconButton from "@mui/material/IconButton";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import styles from "./styles.module.css";

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
        Header: "Products",
        accessor: ({ products }) => {
          return products.map(({ sku }) => sku).join(", ");
        },
        filter: variationProductsFilter,
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
    visibleColumns,
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
    <div className={styles.tableContainer}>
      <table {...getTableProps()} className={styles.table}>
        <thead className={styles.thead}>
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
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {column.canFilter ? (
                    <div>{column.render("Filter")}</div>
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={styles.tbody}>
          {rows.map((row) => {
            prepareRow(row);
            const { id, products } = row.original;
            const expanded =
              !!selectedVariationId && selectedVariationId === id;
            return [
              <tr
                {...row.getRowProps()}
                className={styles.cursorPointer}
                onClick={() => onRowClick(id)}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>,
              expanded && (
                <tr key={`products-${id}`}>
                  <td
                    colSpan={visibleColumns.length}
                    className={styles.variationsExpandedTd}
                  >
                    {products.length === 0 ? (
                      <div className={styles.variationsExpandItem}>- Empty</div>
                    ) : (
                      products.map((product) => (
                        <div
                          key={product.id}
                          className={styles.variationsExpandItem}
                        >
                          <div>
                            <IconButton
                              onClick={() => {
                                onProductDeselect(product);
                              }}
                            >
                              <ArrowBackIosNewIcon
                                sx={{
                                  fontSize: (theme) =>
                                    theme.typography.button.fontSize,
                                  color: (theme) => theme.palette.primary.main,
                                }}
                              />
                            </IconButton>
                          </div>

                          <div className={styles.variationsNameSku}>
                            <div title="Name">{product.name}</div>
                            <div title="SKU">{product.sku}</div>
                            <div
                              title="Attributes"
                              className={styles.variationsAttribute}
                            >
                              {product.attributes.map(({ name, value }) => (
                                <span key={name}>
                                  <span className={styles.capitalize}>
                                    {name}:
                                  </span>{" "}
                                  {value}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </td>
                </tr>
              ),
            ];
          })}
        </tbody>
      </table>
    </div>
  );
}
