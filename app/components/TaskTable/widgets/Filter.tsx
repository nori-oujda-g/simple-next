import { ColumnFilter } from "@tanstack/react-table";
import { ChangeEvent, CSSProperties } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
interface TypeFilter {
    input: string
    columnFilters: ColumnFilter[];
    setColumnFilters: (c: ColumnFilter[] | any) => void;
    className?: string
    style?: CSSProperties
}
const Filter = ({ input, columnFilters, setColumnFilters, className, style }: TypeFilter) => {
    const searsh: string = columnFilters.find(f => f.id === input)?.value as string || "";
    const onFilterChange = (id: string, value: string) => { setColumnFilters((prev: any) => prev.filter((f: any) => f.id !== id).concat({ id, value })) }
    const stylo: string = "col-sm-6 col-12 my-3 mx-3";
    return (
        <div className={`col-12 ${className || ""}`} style={{ ...style }}>
            <InputGroup>
                <InputGroup.Text id="basic-addon1"><FaFilter /></InputGroup.Text>
                <Form.Control
                    placeholder="Searsh"
                    aria-label="Searsh"
                    aria-describedby="basic-addon1"
                    value={searsh}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onFilterChange(input, e.target.value)}
                />
            </InputGroup>
        </div>
    )
}

export default Filter