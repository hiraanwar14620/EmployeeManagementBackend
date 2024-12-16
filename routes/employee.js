import express from "express";
import { executeQuery } from '../dbAccess.js';

const employeeRoutes = express.Router()


employeeRoutes.get('/', async (req, res) => {
    const dbResult = await executeQuery(`SELECT * FROM employee ORDER BY "Id";`);
    res.status(200).json(dbResult.rows);
});

employeeRoutes.get('/:id', async (req, res) => {
    const dbResult = await executeQuery(`SELECT "Id", "FirstName", "LastName", "Title", "DoB", "Gender", "DepartmentId", "MobileNumber" FROM employee where "Id" = ${req.params.id};`);
    if (dbResult.rows.length == 0) {
        res.status(404).send('Not found');
        return;
    }
    res.status(200).json(dbResult.rows[0]);
});

employeeRoutes.post('/', async (req, res) => {
    const { FirstName, LastName, Title, DoB, Gender, DepartmentId, MobileNumber } = req.body;
    const query = `INSERT INTO employee ( "FirstName", "LastName", "Title", "DoB", "Gender", "DepartmentId", "MobileNumber") values ('${FirstName}' , '${LastName}', '${Title}', '${DoB}', '${Gender}', '${DepartmentId}','${MobileNumber}') returning *;`;
    const dbResult = await executeQuery(query);
    res.status(200).json(dbResult.rows[0]);
});

employeeRoutes.delete('/:id', async (req, res) => {
    const dbRes = await executeQuery(`DELETE FROM address WHERE "EmployeeId" = ${req.params.id}; DELETE FROM employee WHERE "Id" = ${req.params.id}`);
    if (dbRes.rowCount < 1) {
        res.status(404).send('Not found');
        return;
    }
    res.status(200);

});

employeeRoutes.patch('/:id', async (req, res) => {
    const { FirstName, LastName, Title, DoB, Gender, DepartmentId, MobileNumber } = req.body;
    const query = (`UPDATE employee
         SET "FirstName"='${FirstName}', "LastName"='${LastName}', "Title"='${Title}', "DoB"='${DoB}',
         "Gender"='${Gender}', "DepartmentId"='${DepartmentId}', "MobileNumber"='${MobileNumber}' 
   WHERE "Id" = ${req.params.id} returning *;`);
    const dbResult = await executeQuery(query);
    if (dbResult.rowCount === 0) {
        res.status(404).send('Not found');
        return;
    }
    res.status(200).json(dbResult.rows[0]);
});

export default employeeRoutes;