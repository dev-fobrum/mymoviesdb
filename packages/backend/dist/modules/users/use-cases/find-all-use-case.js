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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllUseCase = void 0;
const User_entity_1 = __importDefault(require("../entities/User.entity"));
const UserRepository_1 = require("../repositories/UserRepository");
class FindAllUseCase {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_entity_1.default.findAll();
            console.log(users);
            return users;
        });
    }
}
exports.FindAllUseCase = FindAllUseCase;
