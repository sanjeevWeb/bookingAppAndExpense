import express from 'express';
import cors from 'cors';
import { getAllUsers,getUserById,createNewUser, deleteUser } from './database.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/alluser',async (req,res) => {
    const alluser = await getAllUsers();
    res.json(alluser);
})

app.get('/singleuser/:id',async (req,res) => {
    const id = req.params.id;
    const singleuser = await getUserById(id);
    res.json(singleuser);
})

app.post('/createuser', async (req,res) => {
    const { username,phone, email} = req.body;
    console.log(username,phone,email);
    const createdUser = await createNewUser(username,phone,email);
    res.status(201).json(createdUser);
})

app.delete('/deluser/:id', async (req,res) => {
    const id = req.params.id;
    const deletedUser = await deleteUser(id);
    res.json( deletedUser);
})

app.listen(4000,() => {
    console.log('app running at 4000');
})