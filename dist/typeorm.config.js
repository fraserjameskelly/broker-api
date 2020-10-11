"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Policy_1 = require("./entity/Policy");
const path_1 = __importDefault(require("path"));
const PolicyType_1 = require("./entity/PolicyType");
const Insurer_1 = require("./entity/Insurer");
exports.default = {
    type: 'mysql',
    host: constants_1.__prod__ ? 'broker-api.c8u6yfzf0mc4.eu-west-1.rds.amazonaws.com' : 'localhost',
    port: 3306,
    username: 'root',
    password: constants_1.__prod__ ? 'T74wPZfXjscnm2fJ' : '',
    database: 'broker-api',
    synchronize: true,
    logging: false,
    entities: [
        Policy_1.Policy, Insurer_1.Insurer, PolicyType_1.PolicyType
    ],
    migrations: [
        path_1.default.join(__dirname, './migration/*.js')
    ],
    subscribers: [
        path_1.default.join(__dirname, './subscriber/*.js')
    ],
    migrationsRun: true,
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },
};
//# sourceMappingURL=typeorm.config.js.map