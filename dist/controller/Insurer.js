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
exports.remove = exports.update = exports.create = exports.details = exports.list = void 0;
const Policy_1 = __importDefault(require("../entity/Policy"));
const Connection_1 = require("../connection/Connection");
const Insurer_1 = __importDefault(require("../entity/Insurer"));
exports.list = (_req, res) => {
    Connection_1.connection.then((connection) => __awaiter(void 0, void 0, void 0, function* () {
        const policies = yield connection.manager.find(Insurer_1.default);
        res.json(policies);
    }));
};
exports.details = (req, res) => {
    Connection_1.connection
        .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
        let insurer = yield connection.manager.findOne(Insurer_1.default, req.params.id);
        res.json(insurer);
    }))
        .catch(error => {
        console.error('Error ', error);
        res.json(error);
    });
};
exports.create = (req, res) => {
    Connection_1.connection
        .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
        const request = req.body;
        let insurer = new Insurer_1.default();
        insurer.name = request.name;
        yield connection.manager.save(insurer);
        res.json({ message: 'Successfully Saved.' });
    }))
        .catch(error => {
        console.error('Error ', error);
        res.json(error);
    });
};
exports.update = (req, res) => {
    Connection_1.connection
        .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
        let insurer = yield connection.manager.findOne(Insurer_1.default, req.params.id);
        if (typeof insurer !== 'undefined') {
            const request = req.body;
            insurer.name = request.name;
            yield connection.manager.save(insurer);
            res.json({ message: 'Successfully Updated.' });
        }
    }))
        .catch(error => {
        console.error('Error ', error);
        res.json(error);
    });
};
exports.remove = (req, res) => {
    Connection_1.connection
        .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
        let insurer = yield connection.manager.findOne(Insurer_1.default, req.params.id, { relations: ['policies'] });
        if (typeof insurer !== 'undefined') {
            if (typeof insurer.policies !== 'undefined') {
                insurer.policies.forEach((policy) => __awaiter(void 0, void 0, void 0, function* () {
                    yield connection.manager.remove(Policy_1.default, policy);
                }));
            }
            yield connection.manager.remove(Insurer_1.default, insurer);
            res.json({ message: 'Successfully Removed.' });
        }
        else {
            res.json({
                message: `Insurer with id ${req.params.id} could not be found`,
            });
        }
    }))
        .catch(error => {
        console.error('Error ', error);
        res.json(error);
    });
};
//# sourceMappingURL=Insurer.js.map