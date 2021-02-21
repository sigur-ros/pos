"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const index_1 = __importDefault(require("./routes/index"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
const PORT = process.env.PORT;
database_1.connectDB().then(_ => console.log('db connected')).catch(err => console.log(err));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(morgan_1.default('dev'));
app.use('/', index_1.default);
app.listen(PORT, () => {
    console.log(`Listening port: ${PORT}`);
});
//# sourceMappingURL=index.js.map