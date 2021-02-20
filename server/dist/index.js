"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const PORT = process.env.PORT;
app.get('/', (_req, res) => {
    res.send('hello');
});
app.listen(PORT, () => {
    console.log(`Listening port: ${PORT}`);
});
//# sourceMappingURL=index.js.map