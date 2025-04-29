"use client";
import { Client } from "@/lib/features/client/clientApiSlice";
import { CellContext, Table } from "@tanstack/react-table";
import { CSSProperties, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { myPadding } from "../TaskTable";
export interface CellProps {
    getValue: () => string;
    row: CellContext<Client, any>["row"];
    column: CellContext<Client, any>["column"];
    table: Table<Client>;
}
const style: CSSProperties = { overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", background: "transparent", color: "inherit", border: 0 };
const EditableCell = ({ getValue, row, column, table, }: CellProps): JSX.Element => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);
    return (<>
        <Form.Control
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
            }}
            onBlur={(e) => table.options.meta?.updateData({ ...(row.getVisibleCells()[0].row.original as Client), [column.id]: e.target.value })}
            style={{ ...style, ...myPadding }}
        />
    </>)
}

export default EditableCell