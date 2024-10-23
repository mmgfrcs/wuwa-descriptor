import type { Character } from '$lib/models/character';
import pb from '$lib/pocketbase';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = true

export const GET: RequestHandler = async () => {
    return json(await pb
        .collection('characters')
        .getFullList<Character>({sort: "+name", expand: "skills,chains", fetch: fetch, cache: "default"}))
};