import { useMemo, useState } from "react";
import { useAsyncDebounce } from "react-table";
import TextField from "@mui/material/TextField";

export function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <TextField
      // label="Standard"
      variant="standard"
      placeholder="Search"
      value={value || ""}
      onChange={(event) => {
        setValue(event.target.value);
        onChange(event.target.value);
      }}
    />
  );
}

export function DefaultColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <TextField
      // label="Standard"
      variant="standard"
      value={filterValue || ""}
      onChange={(event) => {
        setFilter(event.target.value || undefined);
      }}
      placeholder="Search"
    />
  );
}

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option: string, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
