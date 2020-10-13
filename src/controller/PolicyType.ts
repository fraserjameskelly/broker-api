import Policy from '../entity/Policy';
import { connection } from '../connection/Connection';
import PolicyType from '../entity/PolicyType';

export const list = (_req, res) => {
    connection.then(async connection => {
        const policies: PolicyType[] = await connection.manager.find(
            PolicyType
        );
        res.json(policies);
    });
};

export const details = (req, res) => {
    connection
        .then(async connection => {
            let policyType = await connection.manager.findOne(
                PolicyType,
                req.params.id
            );
            res.json(policyType);
        })
        .catch(error => {
            console.error('Error ', error);
            res.json(error);
        });
};

export const create = (req, res) => {
    connection
        .then(async connection => {
            let request = req.body;

            let policyType = new PolicyType();
            policyType.name = request.name;

            await connection.manager.save(policyType);
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
            let policyType = await connection.manager.findOne(
                PolicyType,
                req.params.id
            );

            if (typeof policyType !== 'undefined') {
                let request = req.body;

                policyType.name = request.name;

                await connection.manager.save(policyType);
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
            let policyType = await connection.manager.findOne(
                PolicyType,
                req.params.id,
                { relations: ['policies'] }
            );

            if (typeof policyType !== 'undefined') {
                if (typeof policyType.policies !== 'undefined') {
                    policyType.policies.forEach(async policy => {
                        await connection.manager.remove(Policy, policy);
                    });
                }

                await connection.manager.remove(PolicyType, policyType);
                res.json({ message: 'Successfully Removed.' });
            } else {
                res.json({
                    message: `PolicyType with id ${req.params.id} could not be found`,
                });
            }
        })
        .catch(error => {
            console.error('Error ', error);
            res.json(error);
        });
};
