import Insurer from '../entity/Insurer';
import Policy from '../entity/Policy';
import PolicyType from '../entity/PolicyType';
import { connection } from '../connection/Connection';

export const list = (_req, res) => {
    connection.then(async connection => {
        const policies: Policy[] = await connection.manager.find(Policy);
        res.json(policies);
    });
};

export const details = (req, res) => {
    connection
        .then(async connection => {
            let policy = await connection.manager.findOne(
                Policy,
                req.params.id
            );
            res.json(policy);
        })
        .catch(error => {
            console.error('Error ', error);
            res.json(error);
        });
};

export const create = (req, res) => {
    connection
        .then(async connection => {
            const request = req.body;
            const requestType = request.policyType;
            const requestInsurer = request.insurer;

            let policy = new Policy();
            policy.customerName = request.customerName;
            policy.customerAddress = request.customerAddress;
            policy.premium = request.premium;

            let policyType = await connection.manager.findOne(
                PolicyType,
                requestType
            );

            if (typeof policyType !== 'undefined') {
                policy.policyType = policyType;
            }

            let insurer = await connection.manager.findOne(
                Insurer,
                requestInsurer
            );

            if (typeof insurer !== 'undefined') {
                policy.insurer = insurer;
            }

            await connection.manager.save(policy);
            res.json({ message: 'Successfully Saved.' });
        })
        .catch(error => {
            console.error('Error ', error);
            res.json(error);
        });
};

export const update = (req, res) => {
    connection
        .then(async connection => {
            let policy = await connection.manager.findOne(
                Policy,
                req.params.id
            );

            if (typeof policy !== 'undefined') {
                const request = req.body;
                const requestType = request.policyType;
                const requestInsurer = request.insurer;

                policy.customerName = request.customerName;
                policy.customerAddress = request.customerAddress;
                policy.premium = request.premium;

                let policyType = await connection.manager.findOne(
                    PolicyType,
                    requestType
                );

                if (typeof policyType !== 'undefined') {
                    policy.policyType = policyType;
                }

                let insurer = await connection.manager.findOne(
                    Insurer,
                    requestInsurer
                );

                if (typeof insurer !== 'undefined') {
                    policy.insurer = insurer;
                }

                await connection.manager.save(policy);
                res.json({ message: 'Successfully Updated.' });
            }
        })
        .catch(error => {
            console.error('Error ', error);
            res.json(error);
        });
};

export const remove = (req, res) => {
    connection
        .then(async connection => {
            let policy = await connection.manager.findOne(
                Policy,
                req.params.id
            );

            if (typeof policy !== 'undefined') {
                await connection.manager.remove(Policy, req.params.id);
                res.json({ message: 'Successfully Removed.' });
            } else {
                res.json({
                    message: `Policy with id ${req.params.id} could not be found`,
                });
            }
        })
        .catch(error => {
            console.error('Error ', error);
            res.json(error);
        });
};
