import express from "express";
const departmentRoutes = express.Router()


departmentRoutes.get('/', (req, res) => {

   let department = [{ id: 1, departmentName: 'HR'}];
   res.status(200).json(department);
    
});
departmentRoutes.get('/:id', (req, res) => {
    console.log('post /api/department is working')
    res.send('');
});

departmentRoutes.post('/', (req, res) => {
    console.log('post /api/department is working')
    res.send('');
});

departmentRoutes.delete('/:id', (req, res) => {
    console.log('post /api/department is working')
    res.send('');
});

departmentRoutes.patch('/:id', (req, res) => {
    console.log('post /api/department is working')
    res.send('');
});

export default departmentRoutes;