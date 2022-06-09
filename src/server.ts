import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import filePath from "./filePath";
import { addSynonymsToWords } from "./addSynonymsToWords";
import { addDefinitionsToWords } from "./addDefinitionsToWords";
import { postedwordData } from "./interfaces";
import { doesUserExist } from "./existUtils";
import { doesWordExist } from "./existUtils";
import { postMeaningsToDB, postSynonymsToDB } from "./postUtils";

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
    const pathToFile = filePath("../public/index.html");
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
            const wordRes = await client.query(`select * from words where id = $1`, [id])
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

//get all users
app.get("/users", async (req, res) => {
    try {
        const userRes = await client.query(`select * from users`)
        res.status(200).send(userRes.rows)
    } catch (error) {
        res.status(500).send({ error: error, stack: error.stack })
    }
})

//get one user
app.get("/users/:user_id", async (req, res) => {
    try {
        const id = parseInt(req.params.user_id)
        const userRes = await client.query(`select * from users where id = $1`, [id])
        res.status(200).send(userRes.rows)
    } catch (error) {
        res.status(500).send({ error: error, stack: error.stack })
    }
})

//post new favourite word
app.post<{}, {}, postedwordData>("/words", async (req, res) => {
    try {
        const { username, word, phonetics, freq, syllables, audio, url, synonyms, meanings } = req.body
        const wordExists = await doesWordExist(client, word)
        if (wordExists) {
            res.status(400).send({ error: "word is already in database!" })
            return
        }
        const userExists = await doesUserExist(client, username)
        if (!userExists) {
            await client.query(`insert into users (username) values ($1)`, [username])
        }
        const user_idRes = await client.query(`select id from users where username = $1`, [username])
        const postWordRes = await client.query(`insert into words (user_id, word, phonetics, freq, syllables, audio, url) values ($1, $2, $3, $4, $5, $6, $7) returning *`, [user_idRes.rows[0].id, word, phonetics, freq, syllables, audio, url])
        const newWordID = postWordRes.rows[0].id
        const synResult = await postSynonymsToDB(client, synonyms, newWordID)
        const meaningResult = await postMeaningsToDB(client, meanings, newWordID)
        res.status(200).send([{ message: "success posting to words", data: postWordRes.rows }, synResult, meaningResult])
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