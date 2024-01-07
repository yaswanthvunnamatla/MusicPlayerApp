const { MongoClient } = require('mongodb');
const express = require("express");
const cors = require("cors");
const  songs  = require('./utlis/songs');

const app = express();

app.use(express.json());
app.use(cors());

const url = 'mongodb://localhost:27017'; 
const dbName = 'musicDatabase'; 
const collectionName = 'songs';

async function insertSongs(songs) {
  const client = new MongoClient(url, { useNewUrlParser: true });

  try {
    await client.connect();
    console.log('Connected to the database');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const collections = await db.listCollections({ name: collectionName }).toArray();

    if (collections.length > 0) {
      console.log('Collection already exists. Skipping insertion.');
      return;
    }

    const result = await collection.insertMany(songs);
    console.log(`${result.insertedCount} songs inserted successfully.`);
  } catch(err) {
    console.error(err);
  } 
}

insertSongs(songs)


async function fetchSongsFromDB() {
    const client = new MongoClient(url, { useNewUrlParser: true });
  
    try {
      await client.connect();
      console.log('Connected to the database');
  
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
  
      const songs = await collection.find({}).toArray();
      return songs;
    } catch (err) {
      console.error(err);
      throw err; 
    } 
}
  
app.get('/api/songs', async (req, res) => {
try {
    const songsFromDB = await fetchSongsFromDB();
    console.log(songsFromDB);
    res.json(songsFromDB); 
} catch (error) {
    res.status(500).json({ message: 'Failed to fetch songs', error: error.message });
}
});

const PORT = 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
