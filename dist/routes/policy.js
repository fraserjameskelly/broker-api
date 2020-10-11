"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Policy_1 = require("../controller/Policy");
const router = express_1.default.Router();
router.use(function timeLog(_req, _res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.get('/', Policy_1.list);
router.post('/', Policy_1.create);
router.get('/:id', Policy_1.details);
router.post('/:id', Policy_1.update);
router.delete('/:id', Policy_1.remove);
exports.default = router;
//# sourceMappingURL=policy.js.map