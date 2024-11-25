import type { Character } from "$lib/models/character.js";
import pb from "$lib/pocketbase";

export async function load(par) {
    return {
        entries: pb
            .collection('characters')
            .getFullList<Character>({sort: "+name", expand: "skills,chains,version", fetch: par.fetch, cache: "default"})
    }
}
