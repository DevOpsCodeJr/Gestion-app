import React from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ClientRegister from "../forms/ClientRegister";

const ModalForm = ({
  obj,
  getClients,
  toggle,
  modal,
  color,
  colorText,
  colorHover,
}) => {
  return (
    <div>
      <Button
        onClick={toggle}
        className={`w-40 rounded-xl py-1 px-1 ${color} ${colorText} hover:${colorHover} cursor-pointer`}
      >
        {obj.type}
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        centered={true}
        className="text-black"
      >
        <ModalBody className="bg-slate-100">
          {obj.type === "Agregar Cliente" ? (
            <ClientRegister toggle={toggle} obj={obj} getClients={getClients} />
          ) : obj.type === "Agregar Orden" ? (
            <div>Contenido para Agregar Orden</div>
          ) : obj.type === "Agregar Empleado" ? (
            <div>Contenido para Agregar Empleado</div>
          ) : null}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalForm;
