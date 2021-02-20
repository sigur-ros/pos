"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
class UserController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = typeorm_1.getRepository(User_1.User);
            const { name, username, password, email } = req.body;
            try {
                const user = userRepo.create({
                    name: name,
                    username: username,
                    email: email,
                    password: password,
                });
                yield userRepo.save(user);
                res.json({ message: "User created!" });
            }
            catch (error) {
                res.json({ error });
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=User.js.map