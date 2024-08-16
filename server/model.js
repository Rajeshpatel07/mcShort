import { connect, model, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const schema = new Schema({
  url: { type: String },
  shortId: { type: String, unique: true },
});

const db = new model("url", schema);

export default db;
