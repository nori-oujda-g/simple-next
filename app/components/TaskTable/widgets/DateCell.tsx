import { Client } from "@/lib/features/client/clientApiSlice";
import { format, pattern } from "@/lib/Types";
import { useEffect, useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaCalendarWeek } from "react-icons/fa6";
import { myPadding } from "../TaskTable";
import { CellProps } from "./EditableCell";

const DateCell = ({ getValue, row, column, table }: CellProps) => {
    const [startDate, setStartDate] = useState<Date>(getValue() as unknown as Date);
    useEffect(() => { setStartDate(getValue() as unknown as Date) }, [getValue()]);
    return (
        <>
            <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => {
                    let d: Date = date || new Date() as Date;
                    setStartDate(d);
                    table.options.meta?.updateData({ ...(row.getVisibleCells()[0].row.original as Client), birth: d })
                }}
                dateFormat={pattern}
                wrapperClassName="date-wrapper"
                customInput={
                    <ButtonGroup style={{ ...myPadding, cursor: "pointer", minHeight: 50, borderRadius: 0 }}>
                        <div>{format(new Date(startDate), pattern) as string} </div>
                        <div className="mx-2" style={{ marginTop: -3 }}><FaCalendarWeek /></div>
                    </ButtonGroup>
                }
            />
        </>
    )
}

export default DateCell