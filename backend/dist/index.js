"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const cors_1 = __importDefault(require("cors"));
const AppDataSource_1 = require("./AppDataSource");
const app = (0, express_1.default)();
exports.app = app;
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/events', eventRoutes_1.default);
// Send index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// Start server
AppDataSource_1.AppDataSource.initialize()
    .then(() => {
    const server = app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch((error) => console.log(error));
