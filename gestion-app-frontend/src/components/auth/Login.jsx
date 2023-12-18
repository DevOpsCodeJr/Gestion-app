import React from "react";
import { useForm } from "../../hooks/useForm";
import { useAppContext } from "../../hooks/useAppContext";

export const Login = () => {
  const { setAuth } = useAppContext();
  const { form, changed } = useForm();

  const loginUser = async (e) => {
    e.preventDefault();

    let dataUser = form;

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUser),
      });

      const data = await res.json();
      if (res.status !== 201) {
        MsgError(data.message);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(
          (data["user"] = {
            id: data.id,
            name: data.name,
            dni: data.dni,
            email: data.email,
          })
        )
      );

      console.log(data.user);
      setAuth(data.user);
      setTimeout(() => {
        window.location.pathname = "/dashboard";
      }, 400);
    } catch (e) {
      throw new Error("Ha ocurrido un error!");
    }
  };

  return (
    <main className="h-screen w-full bg-slate-200 text-black flex items-center justify-center">
      <form
        onSubmit={loginUser}
        className="bg-white flex flex-col w-[21rem] rounded-3xl p-4 h-[17rem] items-center"
      >
        <h1 className="text-center font-extrabold text-2xl text-indigo-500 pt-4">
          Iniciar Sesion
        </h1>
        <div className="m-2 w-full">
          <div className="my-3 mx-1">
            <input
              type="email"
              name="email"
              onChange={changed}
              placeholder="Correo Electronico"
              className="border border-slate-500 rounded-2xl py-2 px-1 w-full pl-5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="my-3 mx-1">
            <input
              type="password"
              name="password"
              onChange={changed}
              placeholder="Contrasenia"
              className="border border-slate-500 rounded-2xl py-2 px-1 w-full pl-5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
        <input
          type="submit"
          value="Iniciar Sesion"
          className="w-40 rounded-2xl py-2 px-1 bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer"
        />
      </form>
    </main>
  );
};
