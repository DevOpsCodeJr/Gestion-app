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
      const res = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUser),
      });

      const data = await res.json();

      if (data.status !== "Success") {
        MsgError(data.message);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setAuth(data.user);
      setTimeout(() => {
        window.location.pathname = "/dashboard";
      }, 400);
    } catch (e) {
      throw new Error("Ha ocurrido un error!");
    }
  };

  return (
    <section>
      <form onSubmit={loginUser} className="">
        <h1 className="">Iniciar Sesion</h1>
        <div className="">
          <div className="">
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={changed}
              placeholder="Correo Electronico"
            />
          </div>
          <div className="">
            <label htmlFor="password" className="">
              Contrasenia
            </label>
            <input
              type="password"
              name="password"
              onChange={changed}
              placeholder="Contrasenia"
            />
          </div>
        </div>
        <input type="submit" value="Iniciar Sesion" className="" />
      </form>
    </section>
  );
};
