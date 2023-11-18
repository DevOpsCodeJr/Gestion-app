import React from "react";
import { Outlet } from "react-router-dom";
import "./Private.css";
import { useAppContext } from "../../../hooks/useAppContext";

export default function Private() {
  const { auth, loading } = useAppContext();

  if (loading) {
    return <h2>Cargando...</h2>;
  } else {
    return (
      <>
        <Outlet />
        {/* <Header /> */}
        <main >
          <article>Aca iria toda la pagina de presupuesto.</article>
        </main>
        {/* <Footer /> */}
      </>
    );
  }
}