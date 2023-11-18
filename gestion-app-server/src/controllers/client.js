import Client from "../models/client.js";
import { Global } from "../helpers/Global.js";

const { statusCode, validations, querys } = Global;

const register = async (req, res) => {
  let params = req.body;

  if (
    !params.fullName ||
    !params.startDate ||
    !params.phone ||
    !params.address ||
    !params.typeOfPayment ||
    !params.amount
  ) {
    return res.status(statusCode.data.ERROR.code).json(statusCode.data.ERROR);
  }

  try {
    const existingClient = await Client.findOne({
      $or: [{ customerNumber: params.customerNumber }],
    });

    if (existingClient) {
      return res
        .status(validations.client.EXISTS.code)
        .send(validations.client.EXISTS);
    }

    let client_to_save = new Client(params);
    let clientStored = await client_to_save.save();

    if (!clientStored) {
      return res
        .status(validations.client.ERROR.code)
        .send(validations.client.ERROR);
    }

    clientStored = clientStored.toObject();

    return res.status(validations.client.SUCCESS.code).json({
      status: validations.client.SUCCESS.status,
      message: validations.client.SUCCESS.message,
      client: clientStored,
    });
  } catch (error) {
    return res.status(querys.client.ERROR.code).json(querys.client.ERROR);
  }
};

const update = async (req, res) => {
  const customerNumber = req.params.customerNumber;
  const clientToUpdate = req.body;

  try {
    const updatedClient = await Client.findOneAndUpdate(
      { customerNumber: customerNumber },
      clientToUpdate,
      { new: true }
    );

    if (!updatedClient) {
      return res
        .status(validations.client.NOTEXISTS.code)
        .json(validations.client.NOTEXISTS);
    }

    return res.status(validations.client.update.SUCCESS.code).json({
      status: validations.client.update.SUCCESS.status,
      message: validations.client.update.SUCCESS.message,
      updatedClient: updatedClient,
    });
  } catch (error) {
    return res.status(querys.task.ERROR.code).json(querys.task.ERROR);
  }
};

const getAllClient = async (req, res) => {
  try {
    const clients = await Client.find({});

    return res.status(statusCode.SUCCESS.code).json({
      status: statusCode.SUCCESS.status,
      message: statusCode.SUCCESS.message,
      clients: clients,
    });
  } catch (err) {
    console.error("Error fetching clients:", err);
    return res.status(querys.user.ERROR.code).send(querys.user.ERROR);
  }
};

const getClientById = async (req, res) => {
  let customerNumber = req.params.customerNumber;

  try {
    const existClient = await Client.findOne({
      customerNumber: customerNumber,
    });

    if (existClient) {
      return res.status(statusCode.SUCCESS.code).json({
        status: statusCode.SUCCESS.status,
        message: statusCode.SUCCESS.message,
        client: existClient,
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "No se encontró el cliente, tal vez no exista.",
      });
    }
  } catch (err) {
    console.error("Error al obtener el cliente:", err);
    return res.status(statusCode.ERROR.code).json(statusCode.ERROR);
  }
};

const remove = async (req, res) => {
  try {
    const customerNumber = req.params.customerNumber;

    const result = await Client.deleteOne({ customerNumber });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "No se encontró el cliente para eliminar",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Cliente eliminado",
      clientRemoved: customerNumber,
    });
  } catch (error) {
    console.error("Error removing client:", error);
    return res.status(500).json({
      status: "error",
      message: "No se ha eliminado el cliente",
    });
  }
};

export { register, getAllClient, getClientById, remove, update };
