import { fullwordData } from "./interfaces";
import { Client } from "pg";

export async function addSynonymsToWords(client: Client, wordList: fullwordData[]) {
    for (const word of wordList) {
        try {
            const synonymRes = await client.query(`select id, word from synonyms where word_id = $1`, [word.id])
            word.synonyms = synonymRes.rows
        } catch (error) {
            console.log(error)
        }
    }
    return wordList
}