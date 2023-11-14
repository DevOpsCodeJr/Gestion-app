import Task from "../models/task.js";
import { Global } from "../helpers/Global.js";

const { validations, querys } = Global;

const getAllTasks = async (req, res) => {
  const { size, page } = req.query;
  try {
    let query = Task.find().sort("-created_at");

    if (!size || size == 0) {
      const tasks = await query;

      if (tasks && tasks.length >= 1) {
        return res.status(validations.task.SUCCESS.code).json(tasks);
      } else {
        return res.status(validations.task.NOTEXISTS.code).json({
          status: validations.task.NOTEXISTS.status,
          message: validations.task.NOTEXISTS.message,
        });
      }
    } else {
      const itemsPerPage = parseInt(size, 10) || 10;
      const pageNumber = parseInt(page, 10) || 1;

      const skip = (pageNumber - 1) * itemsPerPage;

      query = query.skip(skip).limit(itemsPerPage);

      const tasks = await query;

      if (!tasks || tasks.length <= 0) {
        return res.status(404).send({
          status: "error",
          message: "No hay tareas para mostrar.",
        });
      }

      return res.status(200).send({
        status: "success",
        message: "Tareas...",
        page: pageNumber,
        total: tasks.length,
        pages: Math.ceil(tasks.length / itemsPerPage),
        tareas: tasks,
      });
    }
  } catch (error) {
    return res.status(querys.task.ERROR.code).json(querys.task.ERROR);
  }
};

const getTaskByCustomerNumber = async (req, res) => {
  const customerNumber = req.params.customerNumber;

  try {
    const tasks = await Task.find({
      "client.customerNumber": customerNumber,
    });

    if (!tasks || tasks.length === 0) {
      return res
        .status(validations.task.NOTEXISTS.code)
        .json(validations.task.NOTEXISTS);
    }
    return res.status(validations.task.SUCCESS.code).json({
      status: validations.task.SUCCESS.status,
      message: validations.task.SUCCESS.message,
      task: tasks,
    });
  } catch (error) {
    return res.status(querys.task.ERROR.code).json(querys.task.ERROR);
  }
};

const create = async (req, res) => {
  const taskData = req.body;

  try {
    const existTask = await Task.findOne({
      $or: [{ orderNumber: taskData.orderNumber }],
    });

    if (existTask) {
      return res
        .status(validations.task.EXISTS.code)
        .send(validations.task.EXISTS);
    }

    const newTask = await Task.create(taskData);

    if (!newTask) {
      return res
        .status(validations.task.ERROR.code)
        .send(validations.task.ERROR);
    }

    return res.status(validations.task.SUCCESS.code).json({
      status: validations.task.SUCCESS.status,
      message: validations.task.SUCCESS.message,
      task: newTask,
    });
  } catch (error) {
    return res.status(querys.task.ERROR.code).json(querys.task.ERROR);
  }
};

const updateTaskByOrderNumber = async (req, res) => {
  const orderNumber = req.params.orderNumber;
  const updatedTaskData = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { orderNumber: orderNumber },
      updatedTaskData,
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(validations.task.NOTEXISTS.code)
        .json(validations.task.NOTEXISTS);
    }

    return res.status(validations.task.SUCCESS.code).json({
      status: validations.task.SUCCESS.status,
      message: validations.task.SUCCESS.message,
      updatedTask: updatedTask,
    });
  } catch (error) {
    return res.status(querys.task.ERROR.code).json(querys.task.ERROR);
  }
};

const deleteTask = async (req, res) => {
  const orderNumber = parseInt(req.params.orderNumber, 10);

  try {
    const deletedTask = await Task.findOneAndDelete({
      orderNumber: orderNumber,
    });

    if (deletedTask && deletedTask.orderNumber) {
      return res.status(validations.task.SUCCESS.code).json({
        status: validations.task.SUCCESS.status,
        message: "Orden de servicio eliminada correctamente!",
        deletedTask: `${deletedTask.orderNumber}`,
      });
    }

    return res
      .status(validations.task.NOTEXISTS.code)
      .json(validations.task.NOTEXISTS);
  } catch (error) {
    return res.status(querys.task.ERROR.code).json(querys.task.ERROR);
  }
};

export {
  getAllTasks,
  create,
  getTaskByCustomerNumber,
  updateTaskByOrderNumber,
  deleteTask,
};
