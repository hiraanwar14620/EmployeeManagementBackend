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

    const dbRes = await client.query('SELECT * FROM employee')
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

    const dbRes = await client.query('SELECT "Id", "EmployeeId", "Address1", "Address2", "PostalCode", "City", "Phone1", "Phone2", "Province"  FROM address where "Id" = ' + req.params.id);

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

    const employeeId = req.body.EmployeeId;
    const address1 = req.body.Address1;
    const address2 = req.body.Address2;
    const postalCode = req.body.PostalCode;
    const city = req.body.City;
    const phone1 = req.body.Phone1;
    const phone2 = req.body.Phone2;
    const province = req.body.Province;

    const dbRes = await client.query(`INSERT INTO address ("EmployeeId", "Address1", "Address2", "PostalCode", "City", "Phone1", "Phone2", "Province") values (` + employeeId + ` , '` + address1 + `', '` + address2 + `', `+ postalCode +`, '` + city + `', '`+ phone1 + `','` + phone2 + `','` + province + `');`);
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

    const dbRes = await client.query(' DELETE FROM address  WHERE "Id" = ' + req.params.id);
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
    const employeeId = req.body.EmployeeId;
    const address1 = req.body.Address1;
    const address2 = req.body.Address2;
    const postalCode = req.body.PostalCode;
    const city = req.body.City;
    const phone1 = req.body.Phone1;
    const phone2 = req.body.Phone2;
    const province = req.body.Province;


    const dbRes = await client.query(`UPDATE address
         SET "EmployeeId"=${employeeId}, "Address1"='${address1}', "Address2"='${address2}', "PostalCode"=${postalCode}, "City"='${city}',
         "Phone1"='${phone1}', "Phone2"='${phone2}', "Province"='${province}' 
   WHERE "Id" = ` + req.params.id);
    await client.end()

    if (dbRes.rowCount === 0) {
        res.status(404).send('Not found');
        return;
    }

    res.status(200).json(dbRes.rows);
});

export default addressRoutes;