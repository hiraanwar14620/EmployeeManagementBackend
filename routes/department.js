import express from "express";
import pg from 'pg'
const departmentRoutes = express.Router()


departmentRoutes.get('/', async (req, res) => {
    const { Client } = pg
    const client = new Client({
        database: "EMS",
        user: 'postgres',
        password: 'hira123',
        host: 'localhost',
        port: 5432,

    })
    await client.connect()

    const dbRes = await client.query(`SELECT * FROM department`);
    await client.end()

    res.status(200).json(dbRes.rows);

});
departmentRoutes.get('/:id', async (req, res) => {

    const { Client } = pg
    const client = new Client({
        database: "EMS",
        user: 'postgres',
        password: 'hira123',
        host: 'localhost',
        port: 5432,

    })
    await client.connect()

    const dbRes = await client.query(`SELECT "Id","Name" FROM department where "Id" = ${req.params.id};` );
    await client.end()

    if (dbRes.rows.length == 0) {
        res.status(404).send('Not found');
        return;
    }

    res.status(200).json(dbRes.rows);

});

departmentRoutes.post('/', async (req, res) => {
    const { Client } = pg
    const client = new Client({
        database: "EMS",
        user: 'postgres',
        password: 'hira123',
        host: 'localhost',
        port: 5432,

    })
    await client.connect()


    const name = req.body.name;

    const dbRes = await client.query(`INSERT INTO department SET "Name"=${name}`);
    await client.end()

    res.status(200).json(dbRes.rows);

});

departmentRoutes.delete('/:id', async (req, res) => {
    const { Client } = pg
    const client = new Client({
        database: "EMS",
        user: 'postgres',
        password: 'hira123',
        host: 'localhost',
        port: 5432,

    })
    await client.connect()

    const dbRes = await client.query(` DELETE FROM department  WHERE "Id" = ${req.params.id};` );
    await client.end()

    if (dbRes.rows.length == 0) {
        res.status(404).send('Not found');
        return;
    }

    res.status(200).json(dbRes.rows);

});

departmentRoutes.patch('/:id', async (req, res) => {
    const { Client } = pg
    const client = new Client({
        database: "EMS",
        user: 'postgres',
        password: 'hira123',
        host: 'localhost',
        port: 5432,

    })
    await client.connect()
    const name = req.body.name;
    console.log('UPDATE public.department SET "Name"=\'' + name + '\' WHERE "Id"=' + req.params.id + ';');


    const dbRes = await client.query(`UPDATE department SET "Name"='${name}'  WHERE "Id"= ${req.params.id};`);
    await client.end()

    if (dbRes.rowCount===0) {
        res.status(404).send('Not found');
        return;
    }

    res.status(200).json(dbRes.rows);
});

export default departmentRoutes;