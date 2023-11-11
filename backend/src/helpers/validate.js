import validator from "validator";
import { Global } from "../helpers/Global.js";

const { validations } = Global;

const validateUser = (params) => {
  let name =
    !validator.isEmpty(params.name) &&
    validator.isLength(params.name, { min: 3, max: undefined }) &&
    validator.isAlpha(params.name, "es_ES");

  let surname = validator.isLength(params.surname, { min: 3, max: undefined }) &&
    validator.isAlpha(params.surname, "es_ES");

  let email =
    !validator.isEmpty(params.email) && validator.isEmail(params.email);

  let dni = !validator.isEmpty(params.dni);

  let password = !validator.isEmpty(params.password);

  if (!name || !surname || !email || !password || !dni) {
    throw new Error(validations.user.validation.ERROR.message);
  } else {
    console.log(validations.user.validation.SUCCESS.message);
  }
};

const validateClient = (params) => {
  let fullName =
    !validator.isEmpty(params.fullName) &&
    validator.isLength(params.fullName, { min: 3, max: undefined }) &&
    validator.isAlpha(params.fullName, "es_ES");

  let customerNumber = !validator.isEmpty(params.customerNumber);

  let startDate =
    !validator.isEmpty(params.startDate) && validator.isDate(params.startDate);

  let phone = !validator.isEmpty(params.phone);

  let address = !validator.isEmpty(params.address);

  let typeOfPayment = !validator.isEmpty(params.typeOfPayment);

  let amount =
    !validator.isEmpty(params.amount) &&
    validator.isNumeric(String(params.amount));

  if (
    !fullName ||
    !customerNumber ||
    !startDate ||
    !phone ||
    !address ||
    !typeOfPayment ||
    !amount
  ) {
    throw new Error(validations.user.validation.ERROR.message);
  } else {
    console.log(validations.user.validation.SUCCESS.message);
  }
};

export { validateUser, validateClient };
