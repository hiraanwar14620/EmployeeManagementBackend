import express from "express";
const addressRoutes = express.Router()


addressRoutes.get('/', (req, res) => {
    console.log('post /api/address is working')
    res.send('');
});
addressRoutes.get('/:id', (req, res) => {
    console.log('post /api/address is working')
    res.send('');
});

addressRoutes.post('/', (req, res) => {
    console.log('post /api/address is working')
    res.send('');
});

addressRoutes.delete('/:id', (req, res) => {
    console.log('post /api/address is working')
    res.send('');
});

addressRoutes.patch('/:id', (req, res) => {
    console.log('post /api/address is working')
    res.send('');
});

export default addressRoutes;