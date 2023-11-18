import jwt from "jwt-simple";
import moment from "moment";

const secret = process.env.JWT_SECRET;

const createToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(1, "days").unix(),
  };

  return jwt.encode(payload, secret);
};

export { secret, createToken };
