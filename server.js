import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

app.post("/enhance-image", async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const response = await axios.post(
      "https://api.replicate.com/v1/predictions",
      {
        version: "0fbacf7afc6c144e5be9767cff80f25aff23e52b0708f17e20f9879b2f21516c",
        input: { img: imageUrl },
      },
      {
        headers: {
          Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
          Prefer: "wait",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
