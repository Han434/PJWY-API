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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Logger_1 = __importDefault(require("./config/Logger"));
const http_errors_1 = __importDefault(require("http-errors"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const logsDir = path_1.default.join(__dirname, "logs");
if (!fs_1.default.existsSync(logsDir)) {
    fs_1.default.mkdirSync(logsDir, { recursive: true });
}
const logStream = fs_1.default.createWriteStream(path_1.default.join(logsDir, "requests.log"), { flags: 'a' });
app.use((0, morgan_1.default)('combined', { stream: logStream }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    Logger_1.default.info(`${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
    next();
});
app.all("/health-check", (req, res) => res.status(200).end("Yeah server is in good health"));
app.use("*", (req, res, next) => {
    next((0, http_errors_1.default)("Route not found."));
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(PORT, () => {
        Logger_1.default.info(`Server is running successfully at http://localhost:${PORT}`);
    });
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startServer();
    yield (0, database_1.default)();
}))();
