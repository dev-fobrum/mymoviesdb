"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const instance_1 = __importDefault(require("./instance"));
const userRoutes_1 = __importDefault(require("./modules/users/userRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(userRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
instance_1.default
    .sync()
    .then(() => {
    console.log("Database synced");
})
    .catch((error) => {
    console.error("Unable to sync database:", error);
});
