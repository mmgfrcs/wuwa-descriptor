import type { Character } from '$lib/models/character';
import pb from '$lib/pocketbase';
import { json } from '@sveltejs/kit';
import type { EntryGenerator, RequestHandler } from './$types';

export const prerender = true

export const entries: EntryGenerator = async () => {
    let chars = await pb
        .collection('characters')
        .getFullList<Character>({sort: "+name"})
    
	return chars.map((x)=>{return {id: x.id}})
};

export const GET: RequestHandler = async (req) => {
    return json(await pb
        .collection('characters')
        .getOne<Character>(req.params.id, {expand: "skills,chains", fetch: fetch, cache: "force-cache"}))
};