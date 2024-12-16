import express from "express";
import { executeQuery } from '../dbAccess.js';

const addressRoutes = express.Router()

addressRoutes.get('/', async (req, res) => {
    const dbRes = await executeQuery(`SELECT * FROM employee`)
    res.status(200).json(dbRes.rows);
});

addressRoutes.get('/:id', async (req, res) => {
    const dbRes = await executeQuery(`SELECT "Id", "EmployeeId", "Address1", "Address2", "PostalCode", "City", "Phone1", "Phone2", "Province"  FROM address where "Id" = ${req.params.id};`);
    if (dbRes.rows.length == 0) {
        res.status(404).send('Not found');
        return;
    }
    res.status(200).json(dbRes.rows);
});


addressRoutes.post('/', async (req, res) => {
    const { EmployeeId, Address1, Address2, PostalCode, City, Phone1, Phone2, Province } = req.body;
    const dbRes = await executeQuery(`INSERT INTO address ( "EmployeeId", "Address1", "Address2", "PostalCode", "City", "Phone1", "Phone2" ,"Province") values ('${EmployeeId}' , '${Address1}', '${Address2}', '${PostalCode}', '${City}', '${Phone1}','${Phone2}' ,'${Province}');`);
    res.status(200).json(dbRes.rows);
});

addressRoutes.delete('/:id', async (req, res) => {
    const dbRes = await executeQuery(`DELETE FROM address  WHERE "Id" = ${req.params.id};`);
    if (dbRes.rows.length == 0) {
        res.status(404).send('Not found');
        return;
    }
    res.status(200).json(dbRes.rows);
});

addressRoutes.patch('/:id', async (req, res) => {
    const { EmployeeId, Address1, Address2, PostalCode, City, Phone1, Phone2, Province } = req.body;
    const dbRes = await executeQuery(`UPDATE address
         SET "EmployeeId"=${EmployeeId}, "Address1"='${Address1}', "Address2"='${Address2}', "PostalCode"=${PostalCode}, "City"='${City}',
         "Phone1"='${Phone1}', "Phone2"='${Phone2}', "Province"='${Province}' 
   WHERE "Id" = ${req.params.id};`);

    if (dbRes.rowCount === 0) {
        res.status(404).send('Not found');
        return;
    }
    res.status(200).json(dbRes.rows);
});

export default addressRoutes;