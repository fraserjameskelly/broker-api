import Policy from '../entity/Policy';
import { connection } from '../connection/Connection';
import Insurer from '../entity/Insurer';

export const list = (_req, res) => {
    connection.then(async connection => {
        const policies: Insurer[] = await connection.manager.find(Insurer);
        res.json(policies);
    });
};

export const details = (req, res) => {
    connection
        .then(async connection => {
            let insurer = await connection.manager.findOne(
                Insurer,
                req.params.id
            );
            res.json(insurer);
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

            let insurer = new Insurer();
            insurer.name = request.name;

            await connection.manager.save(insurer);
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
            let insurer = await connection.manager.findOne(
                Insurer,
                req.params.id
            );

            if (typeof insurer !== 'undefined') {
                const request = req.body;

                insurer.name = request.name;

                await connection.manager.save(insurer);
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
            let insurer = await connection.manager.findOne(
                Insurer,
                req.params.id,
                { relations: ['policies'] }
            );

            if (typeof insurer !== 'undefined') {
                if (typeof insurer.policies !== 'undefined') {
                    insurer.policies.forEach(async policy => {
                        await connection.manager.remove(Policy, policy);
                    });
                }

                await connection.manager.remove(Insurer, insurer);
                res.json({ message: 'Successfully Removed.' });
            } else {
                res.json({
                    message: `Insurer with id ${req.params.id} could not be found`,
                });
            }
        })
        .catch(error => {
            console.error('Error ', error);
            res.json(error);
        });
};
