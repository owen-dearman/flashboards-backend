import { Client } from "pg";

export async function doesUserExist(client: Client, username: string): Promise<boolean> {
    const userRes = await client.query(`select * from users where username = $1`, [username])
    return userRes.rowCount > 0 ? true : false
}

export async function doesWordExist(client: Client, word: string): Promise<boolean> {
    const wordRes = await client.query("select * from words where word = $1", [word])
    return wordRes.rowCount > 0 ? true : false
}