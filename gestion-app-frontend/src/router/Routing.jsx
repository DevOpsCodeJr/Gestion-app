import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateLayout, PublicLayout } from "../components/layout";
const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/dashboard" element={<PrivateLayout />}>
          <Route path="logout" element={<Login />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Routing;