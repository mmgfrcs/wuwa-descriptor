import type { Character } from "$lib/models/character.js";
import pb from "$lib/pocketbase";

export async function load(par) {
    return {
        entries: await pb
            .collection('characters')
            .getFullList<Character>({sort: "+name", expand: "skills,chains", fetch: par.fetch, cache: "default"})
    }
}
