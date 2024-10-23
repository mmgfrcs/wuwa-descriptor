import type { Character } from "$lib/models/character.js";
import pb from "$lib/pocketbase";

export async function load(par): Promise<{ entries: Character[]; }> {
    return {
        entries: await par.fetch('/api/characters.json').then(res => res.json())
    }
}
