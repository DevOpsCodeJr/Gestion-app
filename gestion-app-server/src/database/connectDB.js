import { set, connect } from "mongoose";
import { Global } from "../helpers/Global.js";

const { database } = Global;

const connectDB = async () => {
  try {
    set("strictQuery", false);
    await connect(database.localURI);
    console.log(database.stateConnectionDB.SUCCESS);
  } catch (e) {
    console.log(e);
    throw new Error(database.stateConnectionDB.ERROR);
  }
};

export default connectDB;
