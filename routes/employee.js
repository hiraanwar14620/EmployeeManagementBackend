import express from "express";
import pg from 'pg'
const employeeRoutes = express.Router()


employeeRoutes.get('/', async (req, res) => {
    const { Client } = pg
    const client = new Client({
        database: "EMS",
        user: 'postgres',
        password: 'hira123',
        host: 'localhost',
        port: 5432,

    })
    await client.connect()

    const dbRes = await client.query(`SELECT * FROM employee`);
    await client.end()

    res.status(200).json(dbRes.rows);
});

employeeRoutes.get('/:id', async (req, res) => {
    const { Client } = pg
    const client = new Client({
        database: "EMS",
        user: 'postgres',
        password: 'hira123',
        host: 'localhost',
        port: 5432,

    })
    await client.connect()

    const dbRes = await client.query(`SELECT "Id", "FirstName", "LastName", "Title", "DoB", "Gender", "DepartmentId", "MobileNumber"   FROM employee where "Id" = ${req.params.id};`);

    await client.end()

    if (dbRes.rows.length == 0) {
        res.status(404).send('Not found');
        return;
    }

    res.status(200).json(dbRes.rows);
});

employeeRoutes.post('/', async (req, res) => {
    const { Client } = pg
    const client = new Client({
        database: "EMS",
        user: 'postgres',
        password: 'hira123',
        host: 'localhost',
        port: 5432,

    })
    await client.connect()

  const {FirstName, LastName, Title, DoB, Gender, DepartmentId, MobileNumber} = req.body;
    

    const dbRes = await client.query(`INSERT INTO employee ( "FirstName", "LastName", "Title", "DoB", "Gender", "DepartmentId", "MobileNumber") values ('${FirstName}' , '${LastName}', '${Title}', '${DoB}', '${Gender}', '${DepartmentId}','${MobileNumber}');`);
    await client.end()

    res.status(200).json(dbRes.rows);

});

employeeRoutes.delete('/:id', async (req, res) => {
    const { Client } = pg
    const client = new Client({
        database: "EMS",
        user: 'postgres',
        password: 'hira123',
        host: 'localhost',
        port: 5432,

    })
    await client.connect()

    const dbRes = await client.query(`DELETE FROM address WHERE "EmployeeId" = ${req.params.id}; DELETE FROM employee WHERE "Id" = ${req.params.id}`);
    await client.end()

    if (dbRes.rowCount < 1) {
        res.status(404).send('Not found');
        return;
    }

    res.status(200).json(dbRes.rows);

});

employeeRoutes.patch('/:id', async (req, res) => {
    const { Client } = pg
    const client = new Client({
        database: "EMS",
        user: 'postgres',
        password: 'hira123',
        host: 'localhost',
        port: 5432,

    })
    await client.connect()
    const{FirstName , LastName, Title, DoB, Gender, DepartmentId, MobileNumber} =  req.body;
   


    const dbRes = await client.query(`UPDATE employee
         SET "FirstName"='${FirstName}', "LastName"='${LastName}', "Title"='${Title}', "DoB"='${DoB}',
         "Gender"='${Gender}', "DepartmentId"='${DepartmentId}', "MobileNumber"='${MobileNumber}' 
   WHERE "Id" = ${req.params.id};`);
    await client.end()

    if (dbRes.rowCount === 0) {
        res.status(404).send('Not found');
        return;
    }

    res.status(200).json(dbRes.rows);
});

export default employeeRoutes;