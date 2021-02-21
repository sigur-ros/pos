"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../controller/User"));
const User = express_1.default.Router();
User.post('/create', User_1.default.create);
exports.default = User;
//# sourceMappingURL=user.js.map