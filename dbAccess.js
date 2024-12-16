import pg from 'pg';
import config from './config.js';

async function executeQuery(sql) {
    const { Client } = pg
    const client = new Client({
        database: config.dbName,
        user: config.dbUser,
        password: config.dbPassword,
        host: config.dbHost,
        port: config.dbPort
    })
    await client.connect()
    const dbRes = await client.query(sql);
    await client.end()
    return dbRes;
}

export { executeQuery };