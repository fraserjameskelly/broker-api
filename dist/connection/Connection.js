"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const typeorm_1 = require("typeorm");
const typeorm_config_1 = __importDefault(require("../typeorm.config"));
exports.connection = typeorm_1.createConnection(typeorm_config_1.default)
    .catch(error => {
    console.log(error);
    return new Promise(() => { return undefined; });
});
//# sourceMappingURL=Connection.js.map