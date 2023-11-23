import express from 'express'
import { getAllData,getSingleData,createExpence, updateExpence, deleteExpence } from './database.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

app.get('/alldata', async (req, res) => {
    const result = await getAllData();
    res.json(result);
})

app.get('/singledata/:id', async (req,res) => {
    const id = req.params.id;
    const result = await getSingleData(id);
    res.json(result);
})

app.post('/createdata',async (req,res) => {
    const { amount, title, category } = req.body;
    const result = await createExpence(amount, title, category);
    res.status(201).json(result);
})

app.put('/updatedata/:id', async (req,res) => {
    const id = req.params.id;
    const {amount} = req.body;
    const result = await updateExpence(id,amount);
    res.json(result);
})

app.delete('/deldata/:id', async (req,res) => {
    const id = req.params.id;
    const result = await deleteExpence(id);
    res.json(result);
})


app.listen(5000,() => {
    console.log('server running at port 5000')
})