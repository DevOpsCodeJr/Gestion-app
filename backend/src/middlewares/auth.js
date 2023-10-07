import jwt from "jwt-simple";
import moment from "moment";
import { secret } from "../services/jwt.js";
import { Global } from "../helpers/Global.js";

const { statusCode } = Global;

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(statusCode.UNAUTHORIZED.code)
      .send(statusCode.UNAUTHORIZED);
  }

  let token = req.headers.authorization.replace(/['"]+/g, "");

  try {
    let payload = jwt.decode(token, secret);

    if (payload.exp <= moment().unix()) {
      return res.status(statusCode.EXP_TOKEN.code).send(statusCode.EXP_TOKEN);
    }

    req.user = payload;
  } catch (e) {
    return res.status(statusCode.EXP_TOKEN.code).send(statusCode.EXP_TOKEN);
  }

  next();
};

export default auth;
