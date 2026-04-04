const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// Middle Ware 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uru7rsz.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        //  database + collection define
        const database = client.db("matrimonyDB");
        const biodataCollection = database.collection("biodata");

        // POST - biodata save
        app.post('/api/biodata', async (req, res) => {
            const data = req.body;

            const result = await biodataCollection.insertOne(data);
            res.send(result);
        });

        // GET - sob biodata ana
        app.get('/api/biodata', async (req, res) => {
            const result = await biodataCollection
                .find()
                .sort({ _id: -1 }) // latest first
                .toArray();

            res.send(result);
        });

        await client.db("admin").command({ ping: 1 });
        console.log("MongoDB Connected!");
    } finally {

    }
}


app.get('/', (req, res) => {
    res.send('Matrimony is Running')
})

app.listen(port, () => {
    console.log(`Matrimony is running on port: ${port}`);
})