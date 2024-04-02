const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

const port = 3000;
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'GamingCatalogDB';


console.log('asdsdsdsds')
app.get('/test', (req, res) => {
    res.json({ message: 'CORS is configured correctly and the server is responding.' });
});

app.get('/data', async (req, res) => {
    try {
        const client = new MongoClient(url);
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('data');

        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to create a new game
app.post('/games', async (req, res) => {
    console.log("Attempting to create a new game with data:", req.body);
    try {
        const client = new MongoClient(url);
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('games');

        const result = await collection.insertOne(req.body);
        const insertedGame = { _id: result.insertedId, ...req.body };
        res.status(201).json(insertedGame);
    } catch (error) {
        console.error('Error creating game:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});


// Endpoint to get all games
app.get('/games', async (req, res) => {
    try {
        const client = new MongoClient(url);
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('games');

        const games = await collection.find({}).toArray();

        res.json(games);
    } catch (error) {
        console.error('Error getting games:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to get a game by ID
app.get('/games/:id', async (req, res) => {
    try {
        const client = new MongoClient(url);
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('games');

        const game = await collection.findOne({ _id: ObjectId(req.params.id) });

        if (!game) {
            res.status(404).json({ error: 'Game not found' });
        } else {
            res.json(game);
        }
    } catch (error) {
        console.error('Error getting game by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Starts the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});