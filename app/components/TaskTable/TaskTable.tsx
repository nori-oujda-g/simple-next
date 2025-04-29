"use client";
import Filter from "@/app/components/TaskTable/widgets/Filter";
import { Client, client0, useAddClientMutation, useDeleteClientMutation, useGetClientsQuery, useUpdateClientMutation } from "@/lib/features/client/clientApiSlice";
import { Operation, WAIT } from "@/lib/Types";
import { ColumnDef, ColumnFilter, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, Table, useReactTable } from "@tanstack/react-table";
import styles from "app/styles/layout.module.css";
import { CSSProperties, useEffect, useState } from "react";
import { Button, ButtonGroup, FormSelect } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil, FaSort } from "react-icons/fa6";
import { IoPersonAddOutline } from "react-icons/io5";
import DateCell from "./widgets/DateCell";
import EditableCell from "./widgets/EditableCell";
import FormModal from "./widgets/FormModal";
import MyTable from "./widgets/MyTable";
import StatusCell from "./widgets/StatusCell";
import UpdateCel from "./widgets/UpdateCel";
//yarn add @tanstack/react-table
//yarn add react-icons
//yarn add @react-icons/all-files
//yarn add react-datepicker
const cc: Client = {
    id: "3319d144-3409-46fd-b469-0e8ac4900fb1",
    name: "amal",
    email: "amal1000@caramail.com",
    status: "Doctor",
    birth: new Date("2000-01-06T00:01:00.000+00:00")
}
export const myPadding: CSSProperties = { padding: "15px 10px 0px 10px" };
const TaskTable = () => {
    const { data, isError, isLoading, isSuccess, refetch } = useGetClientsQuery();
    const [addClient] = useAddClientMutation();
    const [deleteClient] = useDeleteClientMutation();
    const [updtaClient] = useUpdateClientMutation();
    const [clients, setClients] = useState<Client[]>([]);
    const [client, setClient] = useState<Client>(client0);
    const [show, setShow] = useState(false);
    const [operation, setOperation] = useState<Operation>("ADD");
    useEffect(() => {
        setClients(data || []);
    }, [data]);
    const resize: boolean = true;
    const columns: ColumnDef<Client, any>[] = [
        {
            accessorKey: "id",
            enableResizing: resize, header: "id",
            cell: (props) => (<p style={{ ...myPadding, fontSize: 11, paddingTop: 20 }}>{props.getValue()} </p>), size: 225,
        },
        {
            accessorKey: "name",
            enableResizing: resize, header: "name",
            cell: EditableCell
            , size: 225,
        },
        {
            accessorKey: "email", enableResizing: resize, header: "email",
            cell: (props) => <EditableCell
                {...props}
                table={props.table}
            />,
            size: 225, enableSorting: false
        },
        {
            accessorKey: "status", enableResizing: resize, header: "status",
            cell: (props) => <StatusCell  {...props} />,
            size: 225,
        },
        {
            accessorKey: "birth",
            enableResizing: resize, header: "birth",
            cell: DateCell,
            size: 225,
        },
        {
            accessorKey: "update",
            enableResizing: resize, header: "",
            cell: (props) => (<UpdateCel
                {...props}
                title={<FaPencil />}
                client={client}
                setClient={setClient}
                show={show}
                setShow={setShow}
                operation="UPDATE"
                setOperation={setOperation}
            />), size: 50,

            enableSorting: false
        },
        {
            accessorKey: "delete",
            enableResizing: resize, header: "",
            cell: (props) => (<UpdateCel
                {...props}
                title={<FaTrashAlt />}
                client={client}
                setClient={setClient}
                show={show}
                setShow={setShow}
                setOperation={setOperation}
                operation="DELETE"
            />), size: 50,
            enableSorting: false
        },
    ];
    const [pageSize, setPageSize] = useState(5);
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
    useEffect(() => {
        table.setPageSize(pageSize)
    }, [pageSize]);
    const table: Table<Client> = useReactTable({
        data: data || [],
        columns,
        state: { columnFilters },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        columnResizeMode: "onChange",
        meta: {
            updateData: (c: Client) => {
                setTimeout(() => {
                    updtaClient(c);
                    setTimeout(() => {
                        refetch();
                    }, 2 * WAIT);
                    console.clear();
                    console.log("update");
                    console.log(JSON.stringify(c));
                    console.log("-------------");
                    console.log(JSON.stringify(client));

                }, WAIT);
            },
        }
    });
    if (isError) return <h1>There was an error!!!</h1>
    if (isLoading) return <h1>Loading...</h1>
    if (isSuccess)
        return (
            <>
                <Button variant="primary" className="my-2 ms-2"
                    onClick={() => {
                        setOperation("ADD");
                        setClient(client0);
                        setShow(true);
                    }}
                ><IoPersonAddOutline /></Button>
                <FormModal
                    show={show}
                    setShow={setShow}
                    client={client}
                    setClient={setClient}
                    addClient={addClient}
                    updateClient={updtaClient}
                    deleteClient={deleteClient}
                    operation={operation}
                    refetch={refetch}
                />
                <MyTable >
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        style={{ position: "relative", width: header.getSize() }}
                                    >
                                        <div style={{ display: "flex" }}>
                                            <span className="me-2 my-2">{header.column.columnDef.header as string}</span>
                                            {header.column.getCanSort() && <>
                                                <span
                                                    className="me-2 my-2"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                ><FaSort /></span>
                                                <span
                                                    className="me-2 my-2"
                                                    style={{ color: "red", fontSize: 12, paddingTop: 3 }}>
                                                    {header.column.getIsSorted() === "asc" ? "🔼" : header.column.getIsSorted() === "desc" ? "🔽" : ""}
                                                </span>
                                            </>
                                            }
                                            {header.column.id != "update" && header.column.id != "delete" && <Filter input={header.column.id as string} columnFilters={columnFilters} setColumnFilters={setColumnFilters} style={{ flex: "auto" }} />}

                                        </div>
                                        <div
                                            onMouseDown={header.getResizeHandler()}
                                            onTouchStart={header.getResizeHandler()}
                                            className={`${styles.resizer} ${header.column.getIsResizing() ? `${styles.isResizing}` : ""}`}
                                        ></div>
                                    </th>))}
                            </tr>)
                        )}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (<tr key={row.id}>
                            {row.getVisibleCells().map((cel) => (<td key={cel.id} style={{ padding: 0 }}>
                                {flexRender(cel.column.columnDef.cell, cel.getContext())}
                            </td>))}
                        </tr>))}
                    </tbody>
                </MyTable>
                <ButtonGroup className="float-end mx-3">
                    <span className="btn btn-dark"  >
                        {table.getState().pagination.pageIndex}
                        {'-'}
                        {table.getPageCount()}
                    </span>
                    <Button variant="dark"
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </Button>
                    <Button variant="dark"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </Button>
                    <Button variant="dark"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </Button>
                    <Button variant="dark"
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </Button>
                    <FormSelect
                        className="btn btn-dark"
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            setPageSize(+e.target.value)
                        }}
                    >
                        {[5, 10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </FormSelect>
                </ButtonGroup>
            </>
        )
}

export default TaskTable