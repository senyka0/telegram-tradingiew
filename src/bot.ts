import TelegramBot, { Message } from "node-telegram-bot-api";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "./../.env" });

const TOKEN: string = process.env.TOKEN || "";
const PORT: number = +process.env.PORT! || 3000;
const users: number[] = [];

const bot = new TelegramBot(TOKEN, { polling: true });

const app = express();
app.use(bodyParser.json());

app.post("/webhook", async (req: Request, res: Response) => {
  const { message } = req.body as { message: string };
  for (const id of [...new Set(users)]) {
    await bot.sendMessage(id, `TradingView Alert: ${message}`);
  }
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port...`);
});

bot.onText(/\/start/, (msg: Message) => {
  users.push(msg.chat.id);
  bot.sendMessage(msg.chat.id, "Welcome to my bot!");
});
