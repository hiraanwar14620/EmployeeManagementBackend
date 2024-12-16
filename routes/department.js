import express from "express";
import { executeQuery } from '../dbAccess.js';

const departmentRoutes = express.Router()

departmentRoutes.get('/', async (req, res) => {
    const dbResult = await executeQuery(`SELECT * FROM department`);
    res.status(200).json(dbResult.rows);

});

departmentRoutes.get('/:id', async (req, res) => {
    const dbResult = await executeQuery(`SELECT "Id","Name" FROM department where "Id" = ${req.params.id};`);
    if (dbResult.rows.length == 0) {
        res.status(404).send('Not found');
        return;
    }
    res.status(200).json(dbResult.rows[0]);
});

departmentRoutes.post('/', async (req, res) => {
    const name = req.body.name;
    const dbResult = await executeQuery(`INSERT INTO department SET "Name"=${name} returning *;`);
    res.status(200).json(dbResult.rows[0]);
});

departmentRoutes.delete('/:id', async (req, res) => {
    const dbRes = await executeQuery(` DELETE FROM department  WHERE "Id" = ${req.params.id};`);
    if (dbRes.rows.length == 0) {
        res.status(404).send('Not found');
        return;
    }
    res.status(200);
});

departmentRoutes.patch('/:id', async (req, res) => {
    const name = req.body.name;
    const dbRes = await executeQuery(`UPDATE department SET "Name"='${name}'  WHERE "Id"= ${req.params.id} returning *;`);
    if (dbRes.rowCount === 0) {
        res.status(404).send('Not found');
        return;
    }
    res.status(200).json(dbRes.rows[0]);
});

export default departmentRoutes;