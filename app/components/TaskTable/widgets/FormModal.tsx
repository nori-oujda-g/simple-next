import { Client, client0, STATUS_COLOR, StatusColor } from '@/lib/features/client/clientApiSlice';
import { color_for_operation, findColor, format, icon_for_operation, Operation, pattern, variant_for_operation, WAIT } from '@/lib/Types';
import { ChangeEvent, useEffect, useState } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaClosedCaptioning } from "react-icons/fa6";
interface FormModalPros {
    show: boolean;
    setShow: (s: boolean) => void;
    client: Client;
    setClient: (c: Client) => void;
    operation: Operation;
    addClient: (c: Client) => void;
    updateClient: (c: Client) => void;
    deleteClient: (id: string) => void;
    refetch: () => void;
}
function FormModal({ show, setShow, client, setClient, operation, addClient, updateClient, deleteClient, refetch }: FormModalPros) {
    const handleClose = () => setShow(false);
    const [colorStatus, setColorStatus] = useState("white");
    const [startDate, setStartDate] = useState<Date>(new Date())
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Client>();
    useEffect(() => {
        reset(client);
        setColorStatus(findColor(client.status));
        setStartDate(client.birth)
    }, [client])
    const onSubmit: SubmitHandler<Client> = (d: Client) => {
        console.clear();
        console.log(d);
        operation == "ADD" ? addClient(d) : operation == "UPDATE" ? updateClient(d) : operation == "DELETE" ? deleteClient(d.id) : addClient(d);
        setTimeout(() => {
            refetch();
        }, WAIT);
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4 style={color_for_operation(operation)}>{
                            operation == "ADD" ? "ADD NEW CUSTOMER" :
                                operation == "UPDATE" ? "UPDATE THIS CUSTOMER" :
                                    operation == "DELETE" ? "DELETE THIS CUTOMER" : ""} </h4></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)} className="col-11 mx-1 "
                    >
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                ID
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly {...register("id")} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                NAME
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control {...register("name")} plaintext={operation == "DELETE"} readOnly={operation == "DELETE"} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                EMAIL
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control {...register("email")} plaintext={operation == "DELETE"} readOnly={operation == "DELETE"} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                STATUS
                            </Form.Label>
                            <Col sm="10">
                                <Form.Select
                                    {...register("status", {
                                        onChange: (e: ChangeEvent<HTMLSelectElement>) =>
                                            setColorStatus((STATUS_COLOR.find(status => status.name === e.target.value) as StatusColor).color)
                                    })}
                                    style={{ background: colorStatus, color: "white" }}
                                    disabled={operation == "DELETE"}
                                >
                                    <option >--------------------------</option>
                                    {STATUS_COLOR.map(status => (<option key={status.id}
                                        style={{ background: status.color }}
                                        value={status.name} >{status.name}</option>))}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                BIRTH
                            </Form.Label>
                            <Col sm="10">
                                <InputGroup>
                                    <Form.Control value={format(startDate, pattern) as string} readOnly />
                                    <DatePicker
                                        selected={client.birth}
                                        onChange={(date: Date | null) => {
                                            let d: Date = date || new Date() as Date;
                                            // setStartDate(date || new Date() as Date);
                                            setClient({ ...client, birth: d });
                                        }}
                                        dateFormat={pattern}
                                        wrapperClassName="date-wrapper"
                                        disabled={operation == "DELETE"}
                                        customInput={
                                            <InputGroup.Text id="basic-addon1"
                                                style={{
                                                    borderTopLeftRadius: 0,
                                                    borderBottomLeftRadius: 0,
                                                    cursor: "pointer",
                                                    fontSize: 24
                                                }}
                                            ><BsFillCalendarDateFill /></InputGroup.Text>}
                                    />

                                </InputGroup>

                            </Col>
                        </Form.Group>
                        <Button variant="secondary" className="float-end" onClick={handleClose}>
                            <FaClosedCaptioning />
                        </Button>
                        <Button
                            type="submit"
                            className="float-end me-3"
                            variant={variant_for_operation(operation)}
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                setTimeout(() => {
                                    reset(client0);
                                    handleClose();
                                }, 2 * WAIT);
                            }} >{icon_for_operation(operation)} </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default FormModal;