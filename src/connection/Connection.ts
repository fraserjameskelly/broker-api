import { Connection, createConnection } from 'typeorm';
import ConnectionOptions from '../typeorm.config';

export const connection : Promise<Connection> = createConnection(ConnectionOptions)
    .catch(error => {
        console.log(error)
        return new Promise<Connection>(() => { return undefined});
    }) ;
