export const Global = {
  statusCode: {
    ERROR: {
      code: 400,
      status: "error",
      message: "Ah ocurrido un error.",
    },
    UNAUTHORIZED: {
      code: 403,
      status: "unauthorized",
      message: "La petición no tiene la cabecera de autenticación.",
    },
    SUCCESS: {
      code: 200,
      status: "success",
      message: "OK.",
    },
    EXP_TOKEN: {
      code: 400,
      status: "unauthorized",
      message: "Token invalido o expirado.",
    },
    data: {
      ERROR: {
        code: 400,
        status: "error",
        message: "Faltan datos por enviar",
      },
    },
  },
  validations: {
    user: {
      identification: {
        ERROR: {
          code: 400,
          status: "error",
          message: "No te has identificado correctamente",
        },
        SUCCESS: {
          code: 200,
          status: "success",
          message: "Te has identificado correctamente",
        },
      },
      validation: {
        ERROR: {
          code: 400,
          status: "error",
          message: "Valición no superada",
        },
        SUCCESS: {
          code: 200,
          status: "success",
          message: "Valición no superada",
        },
      },
      EXISTS: {
        code: 200,
        status: "success",
        message: "El usuario ya existe",
      },
      NOTEXISTS: {
        code: 400,
        status: "error",
        message: "No existe el usuario!",
      },
      update: {
        ERROR: {
          code: 400,
          status: "error",
          message: "Error al actualizar usuario!",
        },
        SUCCESS: {
          code: 200,
          status: "success",
          message: "Usuario actualizado correctamente!",
        },
      },
      SUCCESS: {
        code: 200,
        status: "success",
        message: "Usuario registrado correctamente",
      },
      ERROR: {
        code: 500,
        status: "error",
        message: "Error al guardar el ususario",
      },
    },
    client: {
      EXISTS: {
        code: 200,
        status: "success",
        message: "El cliente ya existe",
      },
      NOTEXISTS: {
        code: 400,
        status: "error",
        message: "No existe el cliente!",
      },
      update: {
        ERROR: {
          code: 400,
          status: "error",
          message: "Error al actualizar cliente!",
        },
        SUCCESS: {
          code: 200,
          status: "success",
          message: "Cliente actualizado correctamente!",
        },
      },
      SUCCESS: {
        code: 200,
        status: "success",
        message: "Cliente registrado correctamente",
      },
      ERROR: {
        code: 500,
        status: "error",
        message: "Error al guardar el cliente",
      },
    },
    task: {
      EXISTS: {
        code: 200,
        status: "success",
        message: "La orden de servicio ya existe!",
      },
      NOTEXISTS: {
        code: 400,
        status: "error",
        message: "No existe la orden de servicio!",
      },
      update: {
        ERROR: {
          code: 400,
          status: "error",
          message: "Error al actualizar orden de servicio!",
        },
        SUCCESS: {
          code: 200,
          status: "success",
          message: "Orden de servicio actualizada correctamente!",
        },
      },
      SUCCESS: {
        code: 200,
        status: "success",
        message: "Orden de servicio creada correctamente!",
      },
      ERROR: {
        code: 500,
        status: "error",
        message: "Error al crear orden de servicio!",
      },
    },
  },
  database: {
    localURI:
      "mongodb+srv://userdev:b5a1453zxk@gestion-app.1zassia.mongodb.net/?retryWrites=true&w=majority",
    URI: `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.NAME_DB}.1zassia.mongodb.net/?retryWrites=true&w=majority`,
    stateConnectionDB: {
      SUCCESS: `Conexion exitosa a base de datos: ${process.env.NAME_DB}!`,
      ERROR: "Error al conectarse a la base de datos!",
    },
  },
  querys: {
    user: {
      ERROR: {
        code: 500,
        status: "error",
        message: "Error en la consulta de usuarios.",
      },
    },
    task: {
      ERROR: {
        code: 500,
        status: "error",
        message: "Error en la consulta de ordenes de servicio.",
      },
    },
    client: {
      ERROR: {
        code: 500,
        status: "error",
        message: "Error en la consulta de clientes.",
      },
    },
  },
};
