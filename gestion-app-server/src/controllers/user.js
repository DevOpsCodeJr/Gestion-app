import bcrypt from "bcrypt";
import { createToken } from "../services/jwt.js";
import User from "../models/user.js";
import { Global } from "../helpers/Global.js";
import cookie from "cookie";

const { statusCode, validations, querys } = Global;

const register = async (req, res) => {
  let params = req.body;

  if (!params.name || !params.email || !params.password || !params.dni) {
    return res.status(statusCode.data.ERROR.code).json(statusCode.data.ERROR);
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email: params.email.toLowerCase() }],
    });

    if (existingUser) {
      return res
        .status(validations.user.EXISTS.code)
        .send(validations.user.EXISTS);
    }

    let pwd = await bcrypt.hash(params.password, 10);
    params.password = pwd;

    let user_to_save = new User(params);
    let userStored = await user_to_save.save();

    if (!userStored) {
      return res
        .status(validations.user.ERROR.code)
        .json(validations.user.ERROR);
    }

    userStored = userStored.toObject();
    delete userStored.password;
    delete userStored.role;

    return res.status(validations.user.SUCCESS.code).json({
      status: validations.user.SUCCESS.status,
      message: validations.user.SUCCESS.message,
      user: userStored,
    });
  } catch (error) {
    return res.status(querys.user.ERROR.code).json(querys.user.ERROR);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(statusCode.data.ERROR.code).send(statusCode.data.ERROR);
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(validations.user.NOTEXISTS.code)
        .send(validations.user.NOTEXISTS);
    }

    const pwd = bcrypt.compareSync(password, user.password);

    if (!pwd) {
      return res
        .status(validations.user.identification.ERROR.code)
        .send(validations.user.identification.ERROR);
    }

    const token = createToken(user);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("Auth", token, {
        maxAge: 360000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "lax",
      })
    );

    return res.status(validations.user.identification.SUCCESS.code).send({
      status: validations.user.identification.SUCCESS.status,
      message: validations.user.identification.SUCCESS.message,
      user: {
        id: user._id,
        name: user.name,
        dni: user.dni,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(validations.user.ERROR.code).send(validations.user.ERROR);
  }
};

const update = async (req, res) => {
  try {
    const userIdentity = req.user;
    let userToUpdate = req.body;

    delete userToUpdate.iat;
    delete userToUpdate.exp;
    delete userToUpdate.role;

    const existingUsers = await User.find({
      $or: [
        { dni: userToUpdate.dni },
        { surname: userToUpdate.surname.toLowerCase() },
      ],
    });

    const userIsset = existingUsers.some(
      (user) => user && user._id.toString() !== userIdentity.id
    );

    if (userIsset) {
      return res
        .status(validations.user.EXISTS.code)
        .send(validations.user.EXISTS);
    }

    if (userToUpdate.password) {
      const pwd = await bcrypt.hash(userToUpdate.password, 10);
      userToUpdate.password = pwd;
    } else {
      delete userToUpdate.password;
    }

    const userUpdated = await User.findOneAndUpdate(
      { _id: userIdentity.id },
      userToUpdate,
      { new: true }
    );

    if (!userUpdated) {
      return res
        .status(validations.user.update.ERROR.code)
        .json(validations.user.update.ERROR);
    }

    const userWithoutPassword = {
      ...userUpdated.toObject(),
      password: undefined,
    };

    return res.status(validations.user.update.SUCCESS.code).send({
      code: validations.user.update.SUCCESS.code,
      status: validations.user.update.SUCCESS.status,
      message: validations.user.update.SUCCESS.message,
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(querys.user.ERROR.code).send({
      code: querys.user.ERROR.code,
      status: validations.user.update.ERROR.status,
      message: validations.user.update.ERROR.message,
    });
  }
};

export { register, login, update };
