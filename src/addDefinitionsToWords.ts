import { Client } from "pg";
import { fullwordData } from "./interfaces";

export async function addDefinitionsToWords(client: Client, wordList: fullwordData[]) {
    for (const word of wordList) {
        try {
            const definitionRes = await client.query(`select * from meanings where word_id = $1`, [word.id])
            word.meanings = definitionRes.rows
        } catch (error) {
            console.log(error)
        }
    }
    return wordList
}