import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./model.js";
import shortid from "shortid";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/api/:Id", async (req, res) => {
  const { Id } = req.params;
  try {
    const existUrl = await db.findOne({ shortId: Id });
    if (existUrl) {
      return res.status(200).json({ url: existUrl.url });
    } else {
      return res.status(404).json({ err: "Invalid url" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
});

app.post("/api/url", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.json(404).json({ err: "Invalid url string" });
  try {
    const existUrl = await db.findOne({ url });
    if (existUrl) {
      return res.status(200).json({ shortId: existUrl.shortId });
    } else {
      const shortId = shortid.generate();
      const newUrl = await db.create({
        url: url,
        shortId: shortId,
      });
      return res.status(201).json({ shortId: newUrl.shortId });
    }
  } catch {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`server starated on port ${process.env.PORT}`),
);
