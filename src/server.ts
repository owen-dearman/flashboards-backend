import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import filePath from "./filePath";
import { addSynonymsToWords } from "./addSynonymsToWords";
import { addDefinitionsToWords } from "./addDefinitionsToWords";

config(); //Read .env file lines as though they were env vars.

//Call this script with the environment variable LOCAL set if you want to connect to a local db (i.e. without SSL)
//Do not set the environment variable LOCAL if you want to connect to a heroku DB.

//For the ssl property of the DB connection config, use a value of...
// false - when connecting to a local DB
// { rejectUnauthorized: false } - when connecting to a heroku DB
const herokuSSLSetting = { rejectUnauthorized: false }
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting
const dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: sslSetting,
};

const app = express();

app.use(express.json()); //add body parser to each following route handler
app.use(cors()) //add CORS support to each following route handler

const client = new Client(dbConfig);
client.connect();

//index page
app.get("/", async (req, res) => {
    const pathToFile = filePath("./public/index.html");
    res.sendFile(pathToFile);
});

//get all words
app.get("/words", async (req, res) => {
    try {
        const wordsRes = await client.query(`select * from words`)
        const wordResWithSynonyms = await addSynonymsToWords(client, wordsRes.rows)
        const wordResWithDefinitions = await addDefinitionsToWords(client, wordResWithSynonyms)
        res.status(200).send(wordResWithDefinitions)
    } catch (error) {
        res.status(500).send({ error: error, stack: error.stack })
    }
})

//get one word
app.get("/words/:word_id", async (req, res) => {
    try {
        const id = parseInt(req.params.word_id);
        if (id) {
            const wordRes = await client.query(`select * from words where id = $1`, [])
            const wordResWithSynonyms = await addSynonymsToWords(client, wordRes.rows)
            const wordResWithDefinitions = await addDefinitionsToWords(client, wordResWithSynonyms)
            res.status(200).send(wordResWithDefinitions)
        } else {
            res.status(400).send({ error: "Incorrect or absent word ID" })
        }
    } catch (error) {
        res.status(500).send({ error: error, stack: error.stack })
    }
})


//Start the server on the given port
const port = process.env.PORT;
if (!port) {
    throw 'Missing PORT environment variable.  Set it in .env file.';
}
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});