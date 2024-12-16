import express from "express";
import pg from 'pg'
const addressRoutes = express.Router()


addressRoutes.get('/', async (req, res) => {
    const { Client } = pg
    const client = new Client({
        database: "EMS",
        user: 'postgres',
        password: 'hira123',
        host: 'localhost',
        port: 5432,

    })
    await client.connect()

    const dbRes = await client.query(`SELECT * FROM employee`)
    await client.end()

    res.status(200).json(dbRes.rows);

});



addressRoutes.get('/:id', async (req, res) => {
    const { Client } = pg
    const client = new Client({
        database: "EMS",
        user: 'postgres',
        password: 'hira123',
        host: 'localhost',
        port: 5432,

    })
    await client.connect()

    const dbRes = await client.query(`SELECT "Id", "EmployeeId", "Address1", "Address2", "PostalCode", "City", "Phone1", "Phone2", "Province"  FROM address where "Id" = ${req.params.id};` );

    await client.end()

    if (dbRes.rows.length == 0) {
        res.status(404).send('Not found');
        return;
    }

    res.status(200).json(dbRes.rows);
});

addressRoutes.post('/', async (req, res) => {
    const { Client } = pg
    const client = new Client({
        database: "EMS",
        user: 'postgres',
        password: 'hira123',
        host: 'localhost',
        port: 5432,

    })
    await client.connect()

    const { EmployeeId, Address1, Address2, PostalCode, City, Phone1, Phone2, Province } = req.body;
    const query = `INSERT INTO address ( "EmployeeId", "Address1", "Address2", "PostalCode", "City", "Phone1", "Phone2" ,"Province") values ('${EmployeeId}' , '${Address1}', '${Address2}', '${PostalCode}', '${City}', '${Phone1}','${Phone2}' ,'${Province}');`;
    console.log(query);
    const dbRes = await client.query(query);
    await client.end()

    res.status(200).json(dbRes.rows);

});

addressRoutes.delete('/:id', async (req, res) => {
    const { Client } = pg
    const client = new Client({
        database: "EMS",
        user: 'postgres',
        password: 'hira123',
        host: 'localhost',
        port: 5432,

    })
    await client.connect()

    const dbRes = await client.query(`DELETE FROM address  WHERE "Id" = ` + req.params.id);
    await client.end()

    if (dbRes.rows.length == 0) {
        res.status(404).send('Not found');
        return;
    }

    res.status(200).json(dbRes.rows);
});

addressRoutes.patch('/:id', async (req, res) => {
    const { Client } = pg
    const client = new Client({
        database: "EMS",
        user: 'postgres',
        password: 'hira123',
        host: 'localhost',
        port: 5432,

    })
    await client.connect()
 
    const {EmployeeId, Address1, Address2, PostalCode, City, Phone1 ,Phone2 , Province} = req.body;


    const dbRes = await client.query(`UPDATE address
         SET "EmployeeId"=${EmployeeId}, "Address1"='${Address1}', "Address2"='${Address2}', "PostalCode"=${PostalCode}, "City"='${City}',
         "Phone1"='${Phone1}', "Phone2"='${Phone2}', "Province"='${Province}' 
   WHERE "Id" = ${req.params.id};` );
    await client.end()

    if (dbRes.rowCount === 0) {
        res.status(404).send('Not found');
        return;
    }

    res.status(200).json(dbRes.rows);
});

export default addressRoutes;