import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    if (!prompt) {
      return res.status(400).send("There is no prompt");
    }
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
    });
    console.log(response.data);
    const completion = response.data.choices[0].text;

    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error: any) {
    if (error.response) {
      console.log(error.response);
    }
  }
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
