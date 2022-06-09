import { Client } from "pg";
import { meaningObNoID } from "./interfaces";

export type errorOb = { message: string, error: string, stack: string }
export type successOb = { message: string, data: (string | meaningObNoID)[] }

export async function postSynonymsToDB(client: Client, synonyms: string[], word_id: number): Promise<successOb | errorOb> {
    for (const synonym of synonyms) {
        try {
            await client.query(`insert into synonyms (word_id, word) values ($1, $2)`, [word_id, synonym])
        } catch (error) {
            return { message: "bad request for synonym post", error: error, stack: error.stack }
        }
    }
    return { message: "successful posting to synonyms", data: synonyms }
}


export async function postMeaningsToDB(client: Client, meanings: meaningObNoID[], word_id: number): Promise<successOb | errorOb> {
    for (const meaning of meanings) {
        try {
            await client.query(`insert into meanings (word_id, pos, meaning) values ($1, $2, $3)`, [word_id, meaning.pos, meaning.meaning])
        } catch (error) {
            return { message: "bad request for meaning post", error: error, stack: error.stack }
        }
    }
    return { message: "successful posting to meanings", data: meanings }
}