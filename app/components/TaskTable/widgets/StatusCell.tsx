import { Client, Status, STATUS_COLOR } from "@/lib/features/client/clientApiSlice";
import { findColor } from "@/lib/Types";
import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import { CellProps } from "./EditableCell";

const StatusCell = ({ getValue, row, column, table }: CellProps) => {
  const initialValue = getValue();

  return (
    <>
      <Form.Select
        value={initialValue}
        style={{ background: findColor(initialValue), minHeight: 56, borderRadius: 0, border: 0, color: "white" }}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          table.options.meta?.updateData({ ...(row.getVisibleCells()[0].row.original as Client), status: e.target.value as Status })
        }}
      >
        {STATUS_COLOR.map(status => (
          <option
            key={status.id}
            value={status.name}
            style={{ background: status.color }}
          >{status.name} </option>))}
      </Form.Select>
    </>
  )
}

export default StatusCell