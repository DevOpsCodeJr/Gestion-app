import React, { useEffect, useState } from "react";
import ModalForm from "../../components/modal/ModalForm";
import { Global } from "../../helpers/Global";
import { Table } from "../../components/table/Table";

export const Orders = () => {
  const [modal, setModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const { columns, endpoint } = Global.orders;

  const toggle = () => setModal(!modal);

  const getOrders = async () => {
    const res = await fetch(`${Global.backend}${endpoint}`);
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <main className="bg-white h-full w-full rounded-3xl p-4">
      <h1 className="text-2xl font-semibold text-center text-indigo-600">
        Orders
      </h1>
      <section className="text-black">
        <ModalForm
          obj={Global.orders.register}
          getOrders={getOrders}
          toggle={toggle}
          modal={modal}
          color={"bg-indigo-500"}
          colorText={"text-white"}
          colorHover={"bg-indigo-600"}
        />
      </section>
      <section>{/* Realizar maquetado de las ordenes */}</section>
    </main>
  );
};
