import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../../../hooks/useAppContext";

export default function PublicLayout() {
  const { auth } = useAppContext();
  return (
    <>
      <main>{!auth.id ? <Outlet /> : <Navigate to="/dashboard" />}</main>
    </>
  );
}
