"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = require("./config/env.config");
const app_1 = __importDefault(require("./app"));
const db_config_1 = require("./config/db.config");
(0, db_config_1.connectDB)().then(() => {
    app_1.default.listen(env_config_1.env.PORT, () => {
        console.log(`Server running in ${env_config_1.env.NODE_ENV} mode on port ${env_config_1.env.PORT}`);
    });
});
//# sourceMappingURL=server.js.map