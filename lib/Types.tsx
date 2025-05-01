import { CSSProperties } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoSaveSharp } from "react-icons/io5";
import { Client, Color, STATUS_COLOR } from "./features/client/clientApiSlice";
export type Operation = "ADD" | "UPDATE" | "DELETE";
export type Variant = "danger" | "dark" | "info" | "success" | "primary" | "warning";
export const color_for_operation = (o: Operation): CSSProperties => {
    return o == "ADD" ? { color: 'blue' } : o == "UPDATE" ? { color: 'green' } : o == "DELETE" ? { color: 'red' } : { color: 'blue' };
}
export const border_color_for_operation = (o: Operation): CSSProperties => {
    return o == "ADD" ? { borderColor: 'blue' } : o == "UPDATE" ? { borderColor: 'green' } : o == "DELETE" ? { borderColor: 'red' } : { borderColor: 'blue' };
}
export const variant_for_operation = (o: Operation): Variant => {
    return o == "ADD" ? "primary" : o == "UPDATE" ? "success" : o == "DELETE" ? "danger" : "primary";
}
export const icon_for_operation = (o: Operation): React.ReactNode => {
    return o == "ADD" ? <IoSaveSharp /> : o == "UPDATE" ? <FaPencil /> : o == "DELETE" ? <FaTrashAlt /> : <></>;
}
export const pattern = "dd-mm-yy";
export const WAIT: number = 600;
declare module "@tanstack/react-table" {
    interface TableMeta<TData> {
        updateData: (c: Client) => void;
    }
}
export const findColor = (name: string): Color => {
    const status = STATUS_COLOR.find(s => s.name === name);
    return status ? status.color : "white";
}
export const format = (date0: Date, f: string) => {
    try {
        let date = new Date(date0) as Date;
        let c = f.replace(/[a-z]/g, "").charAt(0);
        let form = f.split(c);
        let d = { dd: "", mm: "", yy: 0 }
        d["dd"] = ('0' + date.getDate()).slice(-2);
        d["mm"] = ('0' + (date.getMonth() + 1)).slice(-2);
        d["yy"] = date.getFullYear();
        return d[form[0] as keyof typeof d] + c + d[form[1] as keyof typeof d] + c + d[form[2] as keyof typeof d];

    } catch (e: any) {
        return date0;
    }
}