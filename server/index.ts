import express, { response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

const app = express();
const port = 8000;
const textBodyParser = bodyParser.text();
const jsonBodyParser = bodyParser.json();

app.use(cors());

app.post("/gpt-3.5", textBodyParser, jsonBodyParser, (req, res) => {
  console.log("type of body", typeof req.body);
  console.log("body", req.body);

  const { apiKey, messages } =
    typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  new OpenAIApi(new Configuration({ apiKey }))
    .createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages,
      },
      {
        timeout: 1000 * 60 * 3,
        timeoutErrorMessage: "服务器响应过慢，请稍后再试",
      }
    )
    .then((completion) => {
      console.log(completion.data);

      res.status(completion.status).send({
        status: "success",
        data: completion.data.choices[0].message,
      });
    })
    .catch((e) => {
      console.log(`BUG+++++++++++++\n`, e);

      const errorMessage = { status: "error", message: e.message };
      const errorRes = e.response;

      if (errorRes) {
        errorMessage.message = errorRes.data.error.message;
        res.status(errorRes.status);
      } else if (e.code === "ECONNABORTED") {
        res.status(408);
      } else {
        res.status(e.code);
      }
      
      res.send(errorMessage);
    });
});

app.listen(port, () => {
  console.log(`ChatGPT API Running!`);
});
