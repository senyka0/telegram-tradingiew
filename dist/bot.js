"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + "./../.env" });
const TOKEN = process.env.TOKEN || "";
const PORT = +process.env.PORT || 3000;
const users = [];
const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: true });
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.post("/webhook", (req, res) => {
    const { message } = req.body;
    for (const id of [...new Set(users)]) {
        bot.sendMessage(id, `TradingView Alert: ${message}`);
    }
    res.sendStatus(200);
});
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port...`);
});
bot.onText(/\/start/, (msg) => {
    users.push(msg.chat.id);
    bot.sendMessage(msg.chat.id, "Welcome to my bot!");
});
//# sourceMappingURL=bot.js.map