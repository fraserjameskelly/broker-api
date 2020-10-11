import { __prod__ } from './constants';
import { Policy } from './entity/Policy';
import path from 'path';
import { PolicyType } from './entity/PolicyType';
import { Insurer } from './entity/Insurer';
import { ConnectionOptions } from 'typeorm';

export default {
    type: 'mysql',
    host: __prod__ ? 'broker-api.c8u6yfzf0mc4.eu-west-1.rds.amazonaws.com' :  'localhost',
    port: 3306,
    username: 'root',
    password: __prod__ ? 'T74wPZfXjscnm2fJ' : '',
    database: 'broker-api',
    synchronize: true,
    logging: false,
    entities: [
        Policy, Insurer, PolicyType
    ],
    migrations: [
        path.join(__dirname, './migration/*.js')
    ],
    subscribers: [
        path.join(__dirname, './subscriber/*.js')
    ],
    migrationsRun: true,
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },
} as ConnectionOptions;
