
export interface postedwordData {
    username: string,
    word: string,
    phonetics?: string,
    freq?: number,
    syllables?: number,
    audio?: string,
    url?: string,
    synonyms?: string[],
    meanings?: meaningObNoID[]

}

export type meaningObNoID = { pos: string, meaning: string }