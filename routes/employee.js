import express from "express";
const employeeRoutes = express.Router()


employeeRoutes.get('/', (req, res) => {
    let employees = [{ id: 1, firstName: 'Akif', lastName: 'Tariq' }];
    res.status(200).json(employees);
});

employeeRoutes.get('/:id', (req, res) => {
    let employee = { id: 1, firstName: 'Akif', lastName: 'Tariq' };
    res.status(200).json(employee);
});

employeeRoutes.post('/', (req, res) => {
    console.log('post /api/employee is working')
    res.send('');
});

employeeRoutes.delete('/:id', (req, res) => {
    console.log('delete /api/employee is working')
    res.send('');

});

employeeRoutes.patch('/:id', (req, res) => {
     console.log('post/api/employee is working')
       res.send('');
    });

export default employeeRoutes;