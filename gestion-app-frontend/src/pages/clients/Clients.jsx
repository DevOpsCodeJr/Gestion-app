import React, { useEffect, useState } from "react";
import { Table } from "../../components/table/Table";

import ModalForm from "../../components/modal/ModalForm";
import { Global } from "../../helpers/Global";

export const Clients = () => {
  const [modal, setModal] = useState(false);
  const [clients, setClients] = useState([]);
  const { columns, endpoint } = Global.clients;

  const toggle = () => setModal(!modal);

  const getClients = async () => {
    const res = await fetch(`${Global.backend}${endpoint}`);
    const data = await res.json();
    setClients(data);
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <main className="bg-white h-full w-full rounded-3xl p-4">
      <h1 className="text-2xl font-semibold text-center text-indigo-600">
        Clients
      </h1>
      <section className="text-black">
        <ModalForm
          obj={Global.clients.register}
          getClients={getClients}
          toggle={toggle}
          modal={modal}
          color={"bg-indigo-500"}
          colorText={"text-white"}
          colorHover={"bg-indigo-600"}
        />
      </section>
      <section>
        <Table data={clients} columns={columns} />
      </section>
    </main>
  );
};
