"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PolicyType_1 = require("../controller/PolicyType");
const router = express_1.default.Router();
router.use(function timeLog(_req, _res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.get('/', PolicyType_1.list);
router.post('/', PolicyType_1.create);
router.get('/:id', PolicyType_1.details);
router.post('/:id', PolicyType_1.update);
router.delete('/:id', PolicyType_1.remove);
exports.default = router;
//# sourceMappingURL=policyType.js.map