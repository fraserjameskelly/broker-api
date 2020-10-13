"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const insurer_1 = __importDefault(require("./routes/insurer"));
const policy_1 = __importDefault(require("./routes/policy"));
const policyType_1 = __importDefault(require("./routes/policyType"));
const bodyParser = require("body-parser");
const app = express_1.default();
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.get('/', (_req, res) => {
    console.log('App started');
    res.send('OK');
});
app.use('/insurer', insurer_1.default);
app.use('/policy', policy_1.default);
app.use('/policy-type', policyType_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map