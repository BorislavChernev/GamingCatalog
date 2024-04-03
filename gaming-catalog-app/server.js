const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const port = 3000;
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'GamingCatalogDB';
process.setMaxListeners(0);
// Connect to the MongoDB database when the server starts
async function connectDatabase() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log('Connected to the database');
        return client.db(dbName);
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}
let db;
app.get('/test', (req, res) => {
    res.json({ message: 'CORS is configured correctly and the server is responding.' });
});

app.get('/data', async (req, res) => {
    try {
        const db = await connectDatabase();
        const collection = db.collection('data');
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//  -------------------GAMES------------------------
// Endpoint to create a new game
app.post('/games', async (req, res) => {
    console.log("Attempting to create a new game with data:", req.body);
    try {
        const db = await connectDatabase();
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
        const db = await connectDatabase();
        const collection = db.collection('games');
        const games = await collection.find({}).toArray();

        res.json(games);
    } catch (error) {
        console.error('Error getting games:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/Game/Edit/:id', async (req, res) => {
    console.log('i see u');
    try {
        const db = await connectDatabase();
        const gameId = req.params.id;
        const updatedGameData = req.body;

        if (!ObjectId.isValid(gameId)) {
            console.log('madafaka');
            return res.status(400).send({ message: 'Invalid game ID format' });
        }

        delete updatedGameData._id;


        const collection = db.collection('games');
        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(gameId) },
            { $set: updatedGameData },
            { returnDocument: 'after' }
        );

        if (!result.name) {
            res.status(404).send({ message: 'Game not found' });
        } else {
            res.status(200).json(result.value);
        }
    } catch (error) {
        console.log('madafaka error');
        console.error('Error editing game by ID:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    } finally {
        if (db) await db.client.close();
    }
});

// Endpoint to get a game by ID
app.get('/Game/Details/:id', async (req, res) => {
    try {
        // if (!new ObjectId.isValid(req.params.id)) {
        //     return res.status(400).json({ error: 'Invalid game ID format' });
        // }
        const db = await connectDatabase();
        const collection = db.collection('games');

        const game = await collection.findOne({ _id: new ObjectId(req.params.id) });
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
//  -------------------GAMES------------------------
// Starts the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
