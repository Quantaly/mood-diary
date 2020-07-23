export interface Entry {
    date: string,
    mood: number,
}

export type MusingsType = "text";

export interface Musings {
    entry: string,
    type: MusingsType,
    contents: string,
}

export interface KeyedMusings extends Musings {
    key: number,
}
