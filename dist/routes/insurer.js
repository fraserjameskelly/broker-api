"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Insurer_1 = require("../controller/Insurer");
const router = express_1.default.Router();
router.use(function timeLog(_req, _res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.get('/', Insurer_1.list);
router.post('/', Insurer_1.create);
router.get('/:id', Insurer_1.details);
router.post('/:id', Insurer_1.update);
router.delete('/:id', Insurer_1.remove);
exports.default = router;
//# sourceMappingURL=insurer.js.map