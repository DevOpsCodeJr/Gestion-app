import bcrypt from "bcrypt";
import { createToken } from "../services/jwt.js";
import User from "../models/user.js";
import { validateUser } from "../helpers/validate.js";
import { Global } from "../helpers/Global.js";

const { statusCode, validations, querys } = Global;

const register = (req, res) => {
  let params = req.body;

  if (!params.name || !params.email || !params.password || !params.dni) {
    return res.status(statusCode.data.ERROR.code).json(statusCode.data.ERROR);
  }

  try {
    validateUser(params);
  } catch (e) {
    return res
      .status(validations.user.validation.ERROR.code)
      .json(validations.user.validation.ERROR);
  }

  User.find({
    $or: [{ email: params.email.toLowerCase() }],
  }).exec(async (error, users) => {
    if (error)
      return res.status(querys.user.ERROR.code).json(querys.user.ERROR);

    if (users && users.length >= 1) {
      return res
        .status(validations.user.EXISTS.code)
        .send(validations.user.EXISTS);
    }

    let pwd = await bcrypt.hash(params.password, 10);
    params.password = pwd;

    let user_to_save = new User(params);

    user_to_save.save((error, userStored) => {
      if (error || !userStored)
        return res
          .status(validations.user.ERROR.code)
          .send(validations.user.ERROR);

      userStored.toObject();
      delete userStored.password;
      delete userStored.role;

      return res.status(validations.user.SUCCESS.code).json({
        status: validations.user.SUCCESS.status,
        message: validations.user.SUCCESS.message,
        user: userStored,
      });
    });
  });
};

const login = (req, res) => {
  let params = req.body;

  if (!params.email || !params.password) {
    return res.status(statusCode.data.ERROR.code).send(statusCode.data.ERROR);
  }

  User.findOne({
    email: params.email,
  }).exec((err, user) => {
    if (err || !user)
      return res
        .status(validations.user.NOTEXISTS.code)
        .send(validations.user.NOTEXISTS);

    const pwd = bcrypt.compareSync(params.password, user.password);

    if (!pwd) {
      return res
        .status(validations.user.identification.ERROR.code)
        .send(validations.user.identification.ERROR);
    }

    const token = createToken(user);

    return res.status(validations.user.identification.SUCCESS.code).send({
      status: validations.user.identification.SUCCESS.status,
      message: validations.user.identification.SUCCESS.message,
      user: {
        id: user._id,
        name: user.name,
        dni: user.dni,
      },
      token,
    });
  });
};

const update = (req, res) => {
  let userIdentity = req.user;
  let userToUpdate = req.body;

  delete userToUpdate.iat;
  delete userToUpdate.exp;
  delete userToUpdate.role;

  User.find({
    $or: [
      { dni: userToUpdate.dni },
      { surname: userToUpdate.surname.toLowerCase() },
    ],
  }).exec(async (err, users) => {
    if (err) return res.status(querys.user.ERROR.code).json(querys.user.ERROR);

    let userIsset = false;
    users.forEach((user) => {
      if (user && user._id != userIdentity.id) userIsset = true;
    });

    if (userIsset) {
      return res
        .status(validations.user.EXISTS.code)
        .send(validations.user.EXISTS);
    }

    if (userToUpdate.password) {
      let pwd = await bcrypt.hash(userToUpdate.password, 10);
      userToUpdate.password = pwd;
    } else {
      delete userToUpdate.password;
    }

    try {
      let userUpdated = await User.findByIdAndUpdate(
        { _id: userIdentity.id },
        userToUpdate,
        { new: true }
      );

      if (!userUpdated) {
        return res
          .status(validations.user.update.ERROR.code)
          .json(validations.user.update.ERROR);
      }

      return res.status(validations.user.update.SUCCESS.code).send({
        code: validations.user.update.SUCCESS.code,
        status: validations.user.update.SUCCESS.status,
        message: validations.user.update.SUCCESS.message,
        user: userUpdated,
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

export { register, login, update };
