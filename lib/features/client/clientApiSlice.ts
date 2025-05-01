import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export type Status = "Professor" | "Engineer" | "Doctor" | "Farmer" | "Builder" | "";
export type Color = "red" | "blue" | "green" | "saddlebrown" | "blueviolet" | "white";
export interface StatusColor {
  id: number,
  name: Status
  color: Color;
}

// export const Professor_Status: StatusColor = { id: 1, name: "Professor", color: "blue" };
// export const Engineer_Status: StatusColor = { id: 2, name: "Engineer", color: "red" };
// export const Doctor_Status: StatusColor = { id: 3, name: "Doctor", color: "green" };
// export const Farmer_Status: StatusColor = { id: 4, name: "Farmer", color: "blueviolet" };
// export const Builder_Status: StatusColor = { id: 5, name: "Builder", color: "saddlebrown" };
export const STATUS_COLOR: StatusColor[] = [
  { id: 1, name: "Professor", color: "blue" },
  { id: 2, name: "Engineer", color: "red" },
  { id: 3, name: "Doctor", color: "green" },
  { id: 4, name: "Farmer", color: "blueviolet" },
  { id: 5, name: "Builder", color: "saddlebrown" },
  { id: 6, name: "", color: "white" }
];
export interface Client {
  id: string;
  name: string;
  email: string;
  status: Status;
  birth: Date;
  formatedBirth?: string;
}
export const client0: Client = { id: "", name: "", email: "", status: "", birth: new Date(), formatedBirth: "" };
export const clientApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND }),
  reducerPath: "clientApi",
  tagTypes: ["Client"],
  endpoints: (build) => ({
    getClients: build.query<Client[], void>({
      query: () => "/clients",
    }),
    // addClient: build.mutation<Client, Partial<Client> & Pick<Client, "id">>({
    addClient: build.mutation<Client, Partial<Client>>({
      query: (post) => ({
        url: "/clients",
        method: "POST",
        body: post,
      }),
    }),
    updateClient: build.mutation<Client, Partial<Client> & Pick<Client, "id">>({
      // query: ({ ...post }) => ({
      query: (pot: Client) => ({
        url: `/clients/${pot.id}`,
        method: "PUT",
        body: pot,
      }),
    }),
    deleteClient: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `/clients/${id}`,
          method: 'DELETE',
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // invalidatesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
  })
});
export const { useGetClientsQuery, useAddClientMutation, useUpdateClientMutation, useDeleteClientMutation } = clientApiSlice;
// export interface ClientProp {
//   add: (c: Client) => void;
//   update: (c: Client) => void;
//   del: (id: string) => void;
//   data: Client[];
//   isError: boolean;
//   isLoading: boolean;
//   isSuccess: boolean;
//   refetch: () => void
// };
// const x: Client[] = useGetClientsQuery().data || []
// export const ooo: ClientProp = {
//   add: (c: Client) => useAddClientMutation(),
//   update: (c: Client) => useUpdateClientMutation(),
//   del: (id: string) => useDeleteClientMutation(),
//   data: useGetClientsQuery().data || [],
//   isError: useGetClientsQuery().isError,
//   isLoading: useGetClientsQuery().isLoading,
//   isSuccess: useGetClientsQuery().isSuccess,
//   refetch: useGetClientsQuery().refetch
//   // { data, isError, isLoading, isSuccess, refetch } : useGetClientsQuery()
// }