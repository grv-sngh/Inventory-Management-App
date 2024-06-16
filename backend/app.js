import { Category, Item } from './models/Models.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express()
const port = 3000

mongoose.connect('mongodb+srv://root:root@cluster0.lsejrc8.mongodb.net/portfolio', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

// Categories
app.get('/categories', async (req, res) => {
    let category = await Category.find({})
    res.send(category)
})

app.post('/categories', async (req, res) => {
    const category = new Category({
        name: req.body.name,
        description: req.body.description,
    });
    await category.save();
    res.send(category);
});

// Items
app.get('/items', async (req, res) => {
    let item = await Item.find({})
    res.send(item)
})

app.post('/items', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
    });
    await item.save();
    res.send(item);
});

// item detail
app.get('/items/:id', async (req, res) => {
    let item = await Item.find({"_id": req.params.id})
    res.send(item)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))