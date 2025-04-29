"use client";
import { Client, client0, useAddClientMutation, useDeleteClientMutation, useGetClientsQuery, useUpdateClientMutation } from "@/lib/features/client/clientApiSlice";
import { border_color_for_operation, color_for_operation, Operation } from "@/lib/Types";
import { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./Clients.module.css";
// yarn add react-hook-form
// yarn add react-bootstrap bootstrap
export const Clients = () => {

  const { data, isError, isLoading, isSuccess, refetch } = useGetClientsQuery();
  const [addClient] = useAddClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [deleteClient] = useDeleteClientMutation();
  const [operation, setOperation] = useState<Operation>("ADD");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Client>()
  const onSubmit: SubmitHandler<Client> = (d: Client) => {
    console.clear();
    console.log(d);
    operation == "ADD" ? addClient(d) : operation == "UPDATE" ? updateClient(d) : operation == "DELETE" ? deleteClient(d.id) : addClient(d);
    setTimeout(() => {
      refetch();
    }, 700);
  }
  if (isError) return <h1>There was an error!!!</h1>
  if (isLoading) return <h1>Loading...</h1>
  if (isSuccess)
    return (
      <div className={styles.container}>
        <Form onSubmit={handleSubmit(onSubmit)} className={"col-11 mx-1 " + styles.form} style={border_color_for_operation(operation)}>
          <h4 style={color_for_operation(operation)}>{operation} </h4>
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
              <Form.Control {...register("name")} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              EMAIL
            </Form.Label>
            <Col sm="10">
              <Form.Control {...register("email")} />
            </Col>
          </Form.Group>
          <Button type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              setTimeout(() => {
                reset(client0);
              }, 700);
            }} >save</Button>
        </Form>
        <h3>Liste des clients:</h3>
        <Button
          className="mt-1 mb-1 ms-1"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => { reset(client0); setOperation("ADD") }} >new</Button>
        <Table className="col-12">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>STATUS</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((c: Client) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email} </td>
                <td>{c.status} </td>
                <td><Button variant="success" onClick={(e: React.MouseEvent<HTMLButtonElement>) => { reset(c); setOperation("UPDATE") }} >update</Button></td>
                <td><Button variant="danger" onClick={(e: React.MouseEvent<HTMLButtonElement>) => { reset(c); setOperation("DELETE") }} >delete</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  return null;
};
