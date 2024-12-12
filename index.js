import express from 'express';
import employeeRoutes from './routes/employee.js';
import departmentRoutes from './routes/department.js';
import addressRoutes from './routes/address.js';

const app = express();
const port =3030;

app.use(express.json());
app.use('/api/employee',employeeRoutes);
app.use('/api/department',departmentRoutes);
app.use('/api/address',addressRoutes);

app.listen(port,() =>{
    console.log(`Backend running on ${port}`)
})