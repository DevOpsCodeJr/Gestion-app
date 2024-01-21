import React from "react";
import { X } from "lucide-react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";

const ClientRegister = ({ toggle, obj, getClients }) => {
  const { form, changed } = useForm({});

  const dateFormat = (date) => {
    date = date.replace(/-/g, "");

    const day = date.substring(0, 2);
    const month = date.substring(2, 4);
    const year = date.substring(4);

    return `${day}/${month}/${year}`;
  };

  const clientRegister = async (e) => {
    e.preventDefault();
    const clientObj = {
      address: form.address,
      amount: parseInt(form.amount),
      clientNumber: parseInt(form.clientNumber),
      comments: form.comments,
      dateInit: dateFormat(form.dateInit),
      debt:
        form.debt === "So" ||
        form.debt === "SI" ||
        form.debt === "si" ||
        form.debt === "sI"
          ? true
          : false,
      fullName: form.fullName,
      paymentMethod: form.paymentMethod,
      phoneNumber: form.phoneNumber,
    };

    try {
      const res = await fetch(`${Global.backend}${Global.clients.endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(clientObj),
      });

      if (res.status === 201) {
        getClients();
        toggle();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={clientRegister} className="flex flex-col items-center">
      <div className="flex justify-between w-full my-2 mb-3 pl-5">
        <h1>{obj.title}</h1>
        <button onClick={toggle} className="hover:text-red-600 transition-all">
          <X />
        </button>
      </div>
      <div className="w-full grid grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <input
            type="text"
            onChange={changed}
            name="fullName"
            className="border border-slate-500 rounded-xl py-2 px-2 w-full pl-5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Nombre Completo"
          />
        </div>

        <div>
          <input
            type="text"
            onChange={changed}
            name="phoneNumber"
            className="border border-slate-500 rounded-xl py-2 px-2 w-full pl-5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Numero de Telefono"
          />
        </div>

        <div>
          <input
            type="text"
            onChange={changed}
            name="address"
            className="border border-slate-500 rounded-xl py-2 px-2 w-full pl-5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Direccion"
          />
        </div>
        <div>
          <input
            type="text"
            onChange={changed}
            name="dateInit"
            className="border border-slate-500 rounded-xl py-2 px-2 w-full pl-5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="dd/mm/yyyy"
          />
        </div>
        <div>
          <input
            type="text"
            onChange={changed}
            name="paymentMethod"
            className="border border-slate-500 rounded-xl py-2 px-2 w-full pl-5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Metodo de Pago"
          />
        </div>

        <div>
          <input
            type="number"
            onChange={changed}
            name="amount"
            className="border border-slate-500 rounded-xl py-2 px-2 w-full pl-5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Cantidad"
          />
        </div>

        <div>
          <input
            type="text"
            onChange={changed}
            name="debt"
            className="border border-slate-500 rounded-xl py-2 px-2 w-full pl-5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Deuda"
          />
        </div>

        <div>
          <input
            type="number"
            onChange={changed}
            name="clientNumber"
            className="border border-slate-500 rounded-xl py-2 px-2 w-full pl-5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Numero de Cliente"
          />
        </div>
      </div>
      <div>
        <textarea
          onChange={changed}
          name="comments"
          className="mt-2 resize-none border border-slate-500 rounded-xl py-2 px-2 w-[29rem] h-[8rem] pl-5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Comentarios"
        />
      </div>
      <input
        type="submit"
        value={obj.type}
        className="mt-3 w-40 rounded-xl py-2 px-2 bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer"
      />
    </form>
  );
};

export default ClientRegister;
