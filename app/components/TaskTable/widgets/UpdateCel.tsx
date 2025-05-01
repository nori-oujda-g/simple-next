import { Client } from "@/lib/features/client/clientApiSlice";
import { Operation } from "@/lib/Types";
import { Button } from "react-bootstrap";
import { myPadding } from "../TaskTable";
import { CellProps } from "./EditableCell";
interface UpdateCelPros extends CellProps {
    client: Client;
    setClient: (c: Client) => void;
    show: boolean;
    setShow: (s: boolean) => void;
    title: React.ReactNode;
    setOperation: (o: Operation) => void
    operation: Operation;
}
const UpdateCel = ({ getValue, row, column, table, client, setClient, show, setShow, title, operation, setOperation }: UpdateCelPros) => {
    // const [client, setClient] = useState<Client>(row.getVisibleCells()[0].row.original as Client);
    return (<div style={{ ...myPadding, paddingTop: 10 }} >
        <Button variant={operation == "UPDATE" ? "success" : "danger"}
            onClick={() => {
                setClient(row.getVisibleCells()[0].row.original as Client);
                setOperation(operation)
                setShow(true)
                // alert(JSON.stringify(client))
            }}
        >{title} </Button>
    </div>)
}

export default UpdateCel