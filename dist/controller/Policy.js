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
const Insurer_1 = __importDefault(require("../entity/Insurer"));
const Policy_1 = __importDefault(require("../entity/Policy"));
const PolicyType_1 = __importDefault(require("../entity/PolicyType"));
const Connection_1 = require("../connection/Connection");
exports.list = (_req, res) => {
    Connection_1.connection.then((connection) => __awaiter(void 0, void 0, void 0, function* () {
        const policies = yield connection.manager.find(Policy_1.default, { relations: ['insurer', 'policyType'] });
        res.json(policies);
    }));
};
exports.details = (req, res) => {
    Connection_1.connection
        .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
        let policy = yield connection.manager.findOne(Policy_1.default, req.params.id, { relations: ['insurer', 'policyType'] });
        res.json(policy);
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
        const requestType = request.policyType;
        const requestInsurer = request.insurer;
        let policy = new Policy_1.default();
        policy.customerName = request.customerName;
        policy.customerAddress = request.customerAddress;
        policy.premium = request.premium;
        let policyType = yield connection.manager.findOne(PolicyType_1.default, requestType);
        if (typeof policyType !== 'undefined') {
            policy.policyType = policyType;
        }
        let insurer = yield connection.manager.findOne(Insurer_1.default, requestInsurer);
        if (typeof insurer !== 'undefined') {
            policy.insurer = insurer;
        }
        yield connection.manager.save(policy);
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
        let policy = yield connection.manager.findOne(Policy_1.default, req.params.id);
        if (typeof policy !== 'undefined') {
            const request = req.body;
            const requestType = request.policyType;
            const requestInsurer = request.insurer;
            policy.customerName = request.customerName;
            policy.customerAddress = request.customerAddress;
            policy.premium = request.premium;
            let policyType = yield connection.manager.findOne(PolicyType_1.default, requestType);
            if (typeof policyType !== 'undefined') {
                policy.policyType = policyType;
            }
            let insurer = yield connection.manager.findOne(Insurer_1.default, requestInsurer);
            if (typeof insurer !== 'undefined') {
                policy.insurer = insurer;
            }
            yield connection.manager.save(policy);
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
        let policy = yield connection.manager.findOne(Policy_1.default, req.params.id);
        if (typeof policy !== 'undefined') {
            yield connection.manager.remove(Policy_1.default, policy);
            res.json({ message: 'Successfully Removed.' });
        }
        else {
            res.json({
                message: `Policy with id ${req.params.id} could not be found`,
            });
        }
    }))
        .catch(error => {
        console.error('Error ', error);
        res.json(error);
    });
};
//# sourceMappingURL=Policy.js.map