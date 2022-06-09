import { useMemo, useState } from "react";
import { useAsyncDebounce } from "react-table";

export function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div>
      <input
        value={value || ""}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
        placeholder="Enter value"
        className="w-25"
        style={{
          fontSize: "0.9rem",
          margin: "0px",
          display: "inline",
        }}
      />
    </div>
  );
}

export function DefaultColumnFilter({
  column: {
    filterValue,
    preFilteredRows: { length },
    setFilter,
  },
}) {
  return (
    <input
      value={filterValue || ""}
      onChange={(event) => {
        setFilter(event.target.value || undefined);
      }}
      placeholder={"Enter value"}
      style={{ width: "100px", marginTop: "5px" }}
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
