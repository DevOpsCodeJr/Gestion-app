import Client from "../models/client.js";
import { validateClient } from "../helpers/validate.js";
import { Global } from "../helpers/Global.js";

const { statusCode, validations, querys } = Global;

const register = (req, res) => {
  let params = req.body;

  if (
    !fullName ||
    !customerNumber ||
    !startDate ||
    !phone ||
    !address ||
    !typeOfPayment ||
    !amount
  ) {
    return res.status(statusCode.data.ERROR.code).json(statusCode.data.ERROR);
  }

  try {
    validateClient(params);
  } catch (e) {
    return res
      .status(validations.user.validation.ERROR.code)
      .json(validations.user.validation.ERROR);
  }

  Client.find({
    $or: [{ customerNumber: params.customerNumber }],
  }).exec(async (error, clients) => {
    if (error)
      return res.status(querys.user.ERROR.code).json(querys.user.ERROR);

    if (clients && clients.length >= 1) {
      return res
        .status(validations.user.EXISTS.code)
        .send(validations.user.EXISTS);
    }

    let client_to_save = new Client(params);

    client_to_save.save((error, clientStored) => {
      if (error || !clientStored)
        return res
          .status(validations.user.ERROR.code)
          .send(validations.user.ERROR);

      clientStored.toObject();

      return res.status(validations.user.SUCCESS.code).json({
        status: validations.user.SUCCESS.status,
        message: validations.user.SUCCESS.message,
        client: clientStored,
      });
    });
  });
};

const update = (req, res) => {
  let clientIdentity = req.user;
  let clientToUpdate = req.body;

  Client.find({
    $or: [{ customerNumber: clientToUpdate.customerNumber }],
  }).exec(async (err, clients) => {
    if (err) return res.status(querys.user.ERROR.code).json(querys.user.ERROR);

    let clientIsset = false;
    clients.forEach((client) => {
      if (client && client._id != clientIdentity.id) clientIsset = true;
    });

    if (clientIsset) {
      return res
        .status(validations.user.EXISTS.code)
        .send(validations.user.EXISTS);
    }

    try {
      let clientUpdated = await Client.findByIdAndUpdate(
        { _id: clientIdentity.id },
        clientToUpdate,
        { new: true }
      );

      if (!clientUpdated) {
        return res
          .status(validations.user.update.ERROR.code)
          .json(validations.user.update.ERROR);
      }

      return res.status(validations.user.update.SUCCESS.code).send({
        code: validations.user.update.SUCCESS.code,
        status: validations.user.update.SUCCESS.status,
        message: validations.user.update.SUCCESS.message,
        client: clientUpdated,
      });
    } catch (error) {
      return res.status(querys.user.ERROR.code).send({
        code: querys.user.ERROR.code,
        status: validations.user.update.ERROR.status,
        message: validations.user.update.ERROR.message,
      });
    }
  });
};

const getAllClient = (req, res) => {
  try {
    const clients = Client.find({});

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

const getClientById = (req, res) => {
  let params = req.body;

  try {
    Client.findOne({
      customerNumber: params.customerNumber,
    }).exec(async (error, client) => {
      if (error)
        return res.status(querys.user.ERROR.code).json(querys.user.ERROR);

      if (client && client.length >= 1) {
        return res.status(statusCode.SUCCESS.code).json({
          status: statusCode.SUCCESS.status,
          message: statusCode.SUCCESS.message,
          client: client,
        });
      }

      return res.status(statusCode.ERROR.code).json(statusCode.ERROR);
    });
  } catch (err) {
    console.error("Error al obtener el cliente por número:", err);
    return res.status(statusCode.ERROR.code).json(statusCode.ERROR);
  }
};
// Borrar

// prueba
const testClient = (req, res) => {
  return res.status(200).send({
    status: "OK",
    message: "Mensaje enviado desde controller/client.js",
    client: req.user,
  });
};

export { testClient };
