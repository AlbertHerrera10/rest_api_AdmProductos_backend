"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const express_1 = __importDefault(require("express"));
const colors_1 = __importDefault(require("colors"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const router_1 = __importDefault(require("./router"));
const db_1 = __importDefault(require("./config/db"));
const swagger_1 = __importDefault(require("./config/swagger"));
async function connectDB() {
    try {
        await db_1.default.authenticate();
        await db_1.default.sync({ alter: true });
        console.log(colors_1.default.blue('Conexion exitosa a la db'));
    }
    catch (error) {
        console.log(colors_1.default.red.bold('Hubo un error en la db'));
        console.log(error);
    }
}
connectDB();
//Instancia de express
const server = (0, express_1.default)();
//Permitir conexiones
const corsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        }
        else {
            callback(new Error('Error de CORS'));
        }
    }
};
server.use((0, cors_1.default)(corsOptions));
//Leer datos de formularios
server.use(express_1.default.json());
server.use((0, morgan_1.default)('dev'));
server.use('/api/products', router_1.default);
//Docs
server.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
exports.default = server;
//# sourceMappingURL=server.js.map