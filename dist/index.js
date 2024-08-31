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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const Logger_1 = __importDefault(require("./config/Logger"));
const http_errors_1 = __importDefault(require("http-errors"));
const database_1 = __importDefault(require("./database"));
const loggerMiddleware_1 = require("./middleware/loggerMiddleware");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, morgan_1.default)('combined', { stream: process.stdout }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(loggerMiddleware_1.requestLogger);
app.all("/health-check", (req, res) => res.status(200).end("Yeah server is in good health"));
app.use("*", (req, res, next) => {
    next((0, http_errors_1.default)("Route not found."));
});
app.use(loggerMiddleware_1.errorLogger);
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    if (statusCode === 401) {
        res.status(statusCode).json({ error: "Unauthorized access" });
    }
    else {
        res.status(statusCode).json({ error: err.message });
    }
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(PORT, () => {
        Logger_1.default.info(`Server is running successfully at http://localhost:${PORT}`);
    }).on("error", (err) => {
        Logger_1.default.error(`Server error: ${err.message}`);
    });
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startServer();
    yield (0, database_1.default)();
}))();
