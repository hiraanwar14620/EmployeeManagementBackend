import pg from 'pg';

async function executeQuery(sql) {
    const { Client } = pg
    const client = new Client({
        database: "EMS",
        user: 'postgres',
        password: 'hira123',
        host: 'localhost',
        port: 5432,

    })
    await client.connect()

    const dbRes = await client.query(sql);
    await client.end()

    return dbRes;
}


export { executeQuery };