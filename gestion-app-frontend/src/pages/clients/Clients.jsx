import React, { useEffect, useState } from "react";
import { Table } from "../../components/table/Table";
import dayjs from "dayjs";

export const Clients = () => {
  const [clients, setClients] = useState([]);

  const getClients = async () => {
    const res = await fetch("http://localhost:8080/api/v1/clients");
    const data = await res.json();
    setClients(data);
  };

  useEffect(() => {
    getClients();
  }, []);

  const columns = [
    {
      header: "Full Name",
      accessorKey: "fullName",
      footer: "Full Name",
    },
    {
      header: "Phone Number",
      accessorKey: "phoneNumber",
      footer: "Phone Number",
    },
    {
      header: "Address",
      accessorKey: "address",
      footer: "Address",
    },
    {
      header: "Date Init",
      accessorKey: "dateInit",
      footer: "Date Init",
      cell: (info) => {
        console.log(info.getValue());
        dayjs(info.getValue()).format("DD/MM/YYYY");
      },
    },
    {
      header: "Payment Method",
      accessorKey: "paymentMethod",
      footer: "Payment Method",
    },
    {
      header: "Amount",
      accessorKey: "amount",
      footer: "Amount",
    },
    {
      header: "Debt",
      accessorKey: "debt",
      footer: "Debt",
    },
    {
      header: "Client Number",
      accessorKey: "clientNumber",
      footer: "Client Number",
    },
    {
      header: "Comments",
      accessorKey: "comments",
      footer: "Comments",
    },
  ];

  return (
    <main className="bg-white h-full w-full rounded-3xl p-4">
      <h1 className="text-2xl font-semibold text-center text-indigo-600">
        Clients
      </h1>
      <section>
        <Table data={clients} columns={columns} />
      </section>
    </main>
  );
};
