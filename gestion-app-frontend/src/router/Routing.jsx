import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateLayout, PublicLayout } from "../pages/layout";
import { Login } from "../components/auth/Login";
import { Logout } from "../components/auth/Logout";
import { Error404 } from "../components/error/Error404";
import { Layout } from "../components/layout/Layout";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/dashboard" element={<PrivateLayout />}>
          <Route index element={<Layout />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Routing;
