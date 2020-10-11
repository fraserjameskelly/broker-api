import 'reflect-metadata';
import app from './app';
import { __prod__ } from './constants';

const main = async () => {
    app.listen(process.env.PORT || 4000, () => {
        console.info('Express server listening on http://localhost:4000');
    });
};

main();
