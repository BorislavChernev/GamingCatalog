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
app.post('/Game/Create', async (req, res) => {
    console.log("Attempting to create a new game with data:", req.body);
    try {
        const db = await connectDatabase();
        const collection = db.collection('games');
        console.log(req.body);
        delete req.body._id;
        const result = await collection.insertOne(req.body);
        const insertedGame = { _id: result.insertedId, ...req.body };
        const gameUrl = `/Game/Details/${insertedGame._id}`; // Construct the URL
        res.status(201).json({ game: insertedGame, redirectUrl: gameUrl }); // Send back the URL
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

app.delete('/Game/Delete/:id', async (req, res) => {
    try {
        const db = await connectDatabase();
        const gameId = req.params.id;

        if (!ObjectId.isValid(gameId)) {
            return res.status(400).send({ message: 'Invalid game ID format' });
        }

        const collection = db.collection('games');
        const result = await collection.deleteOne({ _id: new ObjectId(gameId) });

        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Game not found' });
        }

        res.status(204).send(); // No content, successful deletion
    } catch (error) {
        console.error('Error deleting game:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    } finally {
        if (db) await db.client.close();
    }
});
//  -------------------GAMES------------------------


//  -------------------DISCUSSION------------------------
app.post('/Discussion/Create', async (req, res) => {
    console.log("Attempting to create a new discussion with data:", req.body);
    try {
        const db = await connectDatabase();
        const collection = db.collection('discussions');
        console.log(req.body);
        delete req.body._id;
        const result = await collection.insertOne(req.body);
        const insertedDiscussion = { _id: result.insertedId, ...req.body };
        const discussionUrl = `/Discussion/Details/${insertedDiscussion._id}`; // Construct the URL
        res.status(201).json({ discussion: insertedDiscussion, redirectUrl: discussionUrl }); // Send back the URL
    } catch (error) {
        console.error('Error creating discussion:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

app.delete('/Discussion/Delete/:id', async (req, res) => {
    try {
        const db = await connectDatabase();
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid discussion ID format' });
        }

        const collection = db.collection('discussions');
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Discussion not found' });
        }

        res.status(204).send(); // No content, successful deletion
    } catch (error) {
        console.error('Error deleting discussion:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    } finally {
        if (db) await db.client.close();
    }
});

app.get('/discussions', async (req, res) => {
    try {
        const db = await connectDatabase();
        const collection = db.collection('discussions');
        const discussions = await collection.find({}).toArray();

        res.json(discussions);
    } catch (error) {
        console.error('Error getting discussions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//  -------------------DISCUSSION------------------------

//  -------------------GUIDES------------------------
app.post('/api/guide/game/:id/create', async (req, res) => {

    try {
        const db = await connectDatabase();
        const collection = db.collection('guides');
        console.log(req.body);
        delete req.body._id;
        console.log('do tuka stiga puk ddz');
        const result = await collection.insertOne(req.body);
        console.log('op purvi put');
        const insertedGuide = { gameId: result.insertedId, ...req.body };
        console.log('op vtori put');
        console.log(insertedGuide);
        res.status(201).json({ guide: insertedGuide }); // Send back the URL
    } catch (error) {
        console.error('Error creating guide:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

app.get('/api/guides/game', async (req, res) => {
    try {
        const db = await connectDatabase();
        const collection = db.collection('guides');
        const guides = await collection.find().toArray();
        res.json(guides);
    } catch (error) {
        console.error('Error fetching guides:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/Guide/Details/:id', async (req, res) => {
    try {
        // if (!new ObjectId.isValid(req.params.id)) {
        //     return res.status(400).json({ error: 'Invalid game ID format' });
        // }
        const db = await connectDatabase();
        const collection = db.collection('guides');

        const guide = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!guide) {
            res.status(404).json({ error: 'Guide not found' });
        } else {
            res.json(guide);
        }
    } catch (error) {
        console.error('Error getting guide by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.delete('/Guide/Delete/:id', async (req, res) => {
    try {
        const db = await connectDatabase();
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid guide ID format' });
        }

        const collection = db.collection('guides');
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Guide not found' });
        }

        res.status(204).send(); // No content, successful deletion
    } catch (error) {
        console.error('Error deleting guide:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    } finally {
        if (db) await db.client.close();
    }
});
//  -------------------GUIDES------------------------


//  -------------------REVIEWS------------------------
app.post('/api/review/game/:id/create', async (req, res) => {

    try {
        const db = await connectDatabase();
        const collection = db.collection('reviews');
        console.log(req.body);
        delete req.body._id;
        console.log('do tuka stiga puk ddz');
        const result = await collection.insertOne(req.body);
        console.log('op purvi put');
        const insertedReview = { gameId: result.insertedId, ...req.body };
        console.log('op vtori put');
        console.log(insertedReview);
        res.status(201).json({ review: insertedReview }); // Send back the URL
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

app.get('/api/reviews/game/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        const db = await connectDatabase();
        const collection = db.collection('reviews');
        const reviews = await collection.find({ gameId }).toArray();
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.post('/Review/Game/:id/Create', async (req, res) => {
//     try {
//         const gameId = req.params.id;
//         // Assign gameId to the review object
//         const reviewData = { ...req.body, gameId };
//         // Create a new review in the database
//         const newReview = await Review.create(reviewData);
//         res.status(201).json(newReview);
//     } catch (error) {
//         console.error('Error creating review:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
//  -------------------REVIEWS------------------------
// Starts the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
